import fs from 'fs/promises';
import path from 'path';

export async function deleteDirectory(dir: string) {
  try {
    await fs.rm(dir, { recursive: true });
  } catch {}
}

export async function saveFile(outputDir: string, functionName: string, content: string) {
  const filePath = path.normalize(path.join(outputDir, `${functionName}.mcfunction`));
  const normalizedDir = path.normalize(outputDir + '/');
  if (!filePath.startsWith(normalizedDir)) {
    console.error(`Invalid function name: ${functionName}`);
    return;
  }
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content);
}

export function combinePaths(path1: string, path2: string) {
  return `${path1}/${path2}`.replaceAll(/[:/]+/g, '/').replaceAll(/^\/|\/$/g, '');
}

export function isValidPathPart(part: string) {
  return part.match(/^[a-z0-9/:_-]+$/g);
}

export function toSnakeCase(str: string) {
  return str.replace(/ /g, '_')
    .replace(/(_|^)([A-Z])/g, match => match.toLowerCase())
    .replace(/([A-Z])/g, match => '_' + match.toLowerCase());
}
