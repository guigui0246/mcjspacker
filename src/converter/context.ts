import { deleteDirectory, saveFile, combinePaths, isValidPathPart, toSnakeCase, moveFolder } from './tools.js';
import { getFunctionContent } from './parser.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import type {
  RootUriString,
} from '@spyglassmc/core';

let spyglass: typeof import('@spyglassmc/core') | undefined;
let javaEdition: typeof import('@spyglassmc/java-edition') | undefined;
let getNodeJsExternals: typeof import('@spyglassmc/core/lib/nodejs.js').getNodeJsExternals | undefined;

try {
  spyglass = await import('@spyglassmc/core');
  javaEdition = await import('@spyglassmc/java-edition');
  getNodeJsExternals = await import('@spyglassmc/core/lib/nodejs.js').then(module => module.getNodeJsExternals);

} catch {}

export function createMCF(
  {outputDir, functionCallPrefix}: {outputDir: string, functionCallPrefix: string},
  errorOnSpyglass: boolean = false
): Context {
  const tempOutputDir = `${outputDir}.tmp`;

  const deleteTempDirectoryPromise = deleteDirectory(tempOutputDir);

  const writes: Promise<void>[] = [];
  let success = true;

  const nextAnonymousIds: Record<string, number> = {};

  async function finalize() {
    await deleteTempDirectoryPromise;
    await Promise.all(writes)

    if (!spyglass || !javaEdition || !getNodeJsExternals) {
      if (errorOnSpyglass) {
        throw new Error("SpyglassMC is not installed, but errorOnSpyglass is true.");
      }
      return;
    }

    else

    {
      const { Project, Logger, fileUtil } = spyglass;

      // SpyglassMC only registers the mcfunction language for a datapack root.
      await fs.writeFile(path.join(tempOutputDir, 'pack.mcmeta'), JSON.stringify({
        pack: {
          pack_format: 81,
          description: 'Temporary metadata used for validation',
        },
      }));

      const cacheRoot = pathToFileURL(`${tempOutputDir}.spyglass-cache/`).href as RootUriString;
      const projectRoot = pathToFileURL(`${tempOutputDir}/`).href as RootUriString;
      const normalizedProjectRoot = projectRoot.startsWith('file:///C:/') ? projectRoot.replace('file:///C:/', 'file:///c:/') : projectRoot;
      const project = new Project({
        cacheRoot,
        externals: getNodeJsExternals({cacheRoot, logger: Logger.noop()}),
        initializers: [javaEdition.initialize],
        logger: Logger.noop(),
        projectRoots: [projectRoot],
      });

      project.on('documentErrored', ({errors, uri}) => {
        if (!uri.endsWith('.mcfunction')) {
          return;
        }
        let lines = '';
        for (const error of errors) {
          // Ignore errors that are caused by the fact that we don't have all the files in the project yet.
          if (error.message.startsWith("Cannot find ")) {
            continue;
          }
          const line = error.posRange.start.line + 1;
          lines += `[SpyglassMC] ${uri.replace(normalizedProjectRoot, '')} (${line}): ${error.message}\n`;
          if (errorOnSpyglass) {
            success = false;
          }
        }
        if (lines) {
          console.warn(lines);
        }
      });

      try {
        await project.init();
        const functionUris = (await fileUtil.getAllFiles(project.externals, projectRoot))
          .filter(uri => uri.endsWith('.mcfunction'));
        for (const uri of functionUris) {
          const content = new TextDecoder().decode(await fileUtil.readFile(project.externals, uri));
          await project.onDidOpen(uri, 'mcfunction', 1, content);
        }
        await project.ready();
        await Promise.all(functionUris.map(uri => project.ensureClientManagedChecked(uri)));
        await project.analyzeProject();
      }
      catch (error) {
        console.warn('[SpyglassMC] Failed to validate generated functions:', error);
      }
      finally {
        await project.close();
        await deleteDirectory(`${tempOutputDir}.spyglass-cache`);
        await fs.rm(path.join(tempOutputDir, 'pack.mcmeta'), { force: true });
      }

    }  // End of running spyglassMC validation

    if (success) {
      await moveFolder(tempOutputDir, outputDir);
      await deleteDirectory(tempOutputDir);
      console.log(`Datapack generated successfully in ${outputDir}/`);
    }
    else {
      throw new Error("Failed to generate datapack, see errors above.\nTemporary files are in " + tempOutputDir + "/");
    }
  }

  process.once('beforeExit', () => {
    void finalize().catch(error => {
      console.error(error);
      process.exitCode = 1;
    });
  });

  function createAnonymousContext(functionPath: string) {
    if (functionPath === '') {
      functionPath = 'anonymous';
    }
    let id = nextAnonymousIds[functionPath] = (nextAnonymousIds[functionPath] || 0) + 1;
    return createContext(`${functionPath}/anonymous_${id}`);
  }

  function createContext(functionPath: string): Context {
    // replacing only the first / to :
    const createsAnonymousFunctions = functionPath === '' || functionPath === 'anonymous' || functionPath.endsWith('/anonymous');
    const asString = createsAnonymousFunctions ?
      '[ERR anonymous function]' :
      `function ${combinePaths(functionCallPrefix, functionPath).replace('/', ':')}`;

    function get(_target: Context, prop: string | symbol): Context | (() => string) {
      if (prop === Symbol.toStringTag || prop === Symbol.toPrimitive) {
        return () => asString;
      }
      if (typeof prop === 'symbol') {
        return Reflect.get(_target, prop);
      }
      prop = toSnakeCase(`${prop}`);
      if (!isValidPathPart(prop)) {
        throw new Error(`Invalid path: '${prop}'`);
      }
      return createContext(combinePaths(functionPath, prop));
    }

    function set(_target: Context, _prop: string | symbol, _value: unknown) {
      return false;
    }

    function target(...args: [ValidParam1, ...ValidParam2[]]): Context {
      if (createsAnonymousFunctions) {
        return createAnonymousContext(functionPath)(...args);
      }

      let functionContent: string;

      try {
        functionContent = getFunctionContent(...args);
      } catch (error) {
        console.error(error);
        success = false;
        return proxy;
      }

      writes.push(
        deleteTempDirectoryPromise.then(
          () => saveFile(tempOutputDir, functionPath, functionContent).catch(err => {
            console.error(err);
            success = false;
          })
        ).catch(err => {
          console.error(err);
          success = false;
        })
      );

      return proxy;
    }

    const proxy = new Proxy(target, {get, set}) as Context;
    return proxy;
  }

  return createContext('');
}
