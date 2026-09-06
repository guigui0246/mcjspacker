import fs from 'fs/promises';
import path from 'path';

export type Context = {
  [prop: string]: Context;
  [Symbol.toStringTag]: () => string;
  [Symbol.toPrimitive]: () => string;
  (...args: unknown[]): Context;
};

async function deleteDirectory(dir: string) {
  try {
    await fs.rm(dir, { recursive: true });
  } catch {}
}

async function saveFile(outputDir: string, functionName: string, content: string) {
  const filePath = path.normalize(path.join(outputDir, `${functionName}.mcfunction`));
  const normalizedDir = path.normalize(outputDir + '/');
  if (!filePath.startsWith(normalizedDir)) {
    console.error(`Invalid function name: ${functionName}`);
    return;
  }
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content);
}

function combinePaths(path1: string, path2: string) {
  return `${path1}/${path2}`.replaceAll(/[:/]+/g, '/').replaceAll(/^\/|\/$/g, '');
}

function getFunctionContent(strings: TemplateStringsArray | string, ...values: unknown[]) {
  let functionContent;
  if (Array.isArray(strings)) {
    functionContent = `${strings[0]}`;
    for (let i = 0; i < values.length; i++) {
      functionContent += values[i];
      functionContent += strings[i + 1];
    }
  } else if (typeof strings === 'string') {
    functionContent = strings;
  } else {
    throw new Error('Invalid function content');
  }
  return functionContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}

function isValidPathPart(part: string) {
  return part.match(/^[a-z0-9/:_-]+$/g);
}

function toSnakeCase(str: string) {
  return str.replace(/ /g, '_')
    .replace(/(_|^)([A-Z])/g, match => match.toLowerCase())
    .replace(/([A-Z])/g, match => '_' + match.toLowerCase());
}

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
