import { deleteDirectory, saveFile, combinePaths, isValidPathPart, toSnakeCase } from './tools.js';
import { getFunctionContent } from './parser.js';


export function createMCF({outputDir, functionCallPrefix}: {outputDir: string, functionCallPrefix: string}): Context {
  const deleteDirectoryPromise = deleteDirectory(outputDir);

  const nextAnonymousIds: Record<string, number> = {};

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

    function target(...args: unknown[]): Context {
      if (createsAnonymousFunctions) {
        return createAnonymousContext(functionPath)(...args);
      }
      const functionContent = getFunctionContent(...args as [TemplateStringsArray | string, ...unknown[]]);

      deleteDirectoryPromise.then(() => saveFile(outputDir, functionPath, functionContent));

      return proxy;
    }

    const proxy = new Proxy(target, {get, set}) as Context;
    return proxy;
  }

  return createContext('');
}
