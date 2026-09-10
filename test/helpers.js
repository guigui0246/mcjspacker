import { execFile } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(testDirectory, '../src');

async function readOutputTree(directory, relativeDirectory = '') {
  const entries = await readdir(path.join(directory, relativeDirectory), { withFileTypes: true });
  const output = {};

  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) {
      Object.assign(output, await readOutputTree(directory, relativePath));
    } else {
      output[relativePath.replaceAll(path.sep, '/')] = await readFile(path.join(directory, relativePath), 'utf8');
    }
  }

  return output;
}

export async function generateOutput(source) {
  const temporaryDirectory = await mkdtemp(path.join(tmpdir(), 'mcjspacker-test-'));

  try {
    const sourcePath = path.join(temporaryDirectory, 'datapack.ts');
    await writeFile(sourcePath, source.replaceAll('__PACKAGE__', pathToFileURL(path.join(projectDir, 'index.ts')).href));
    await execFileAsync(process.execPath, [sourcePath], {
      cwd: temporaryDirectory,
    });

    return await readOutputTree(path.join(temporaryDirectory, 'output'));
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}
