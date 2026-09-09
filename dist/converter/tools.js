import fs from 'fs/promises';
import path from 'path';
export async function deleteDirectory(dir) {
    try {
        await fs.rm(dir, { recursive: true });
    }
    catch { }
}
export async function saveFile(outputDir, functionName, content) {
    const filePath = path.normalize(path.join(outputDir, `${functionName}.mcfunction`));
    const normalizedDir = path.normalize(outputDir + '/');
    if (!filePath.startsWith(normalizedDir)) {
        throw new Error(`Invalid function name: ${functionName}`);
    }
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content);
}
export function combinePaths(path1, path2) {
    return `${path1}/${path2}`.replaceAll(/[:/]+/g, '/').replaceAll(/^\/|\/$/g, '');
}
export function isValidPathPart(part) {
    return part.match(/^[a-z0-9/:_-]+$/g);
}
export function toSnakeCase(str) {
    return str.replace(/ /g, '_')
        .replace(/(_|^)([A-Z])/g, match => match.toLowerCase())
        .replace(/([A-Z])/g, match => '_' + match.toLowerCase());
}
export async function moveFolder(source, outputDir) {
    await fs.cp(source, outputDir, { recursive: true });
}
//# sourceMappingURL=tools.js.map