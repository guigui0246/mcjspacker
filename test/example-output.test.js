import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import test from 'node:test';

const execFileAsync = promisify(execFile);
const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(testDirectory, '..');
const expectedOutputPath = path.join(testDirectory, 'fixtures', 'example-output.json');

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

test('example output remains unchanged', async () => {
  const temporaryDirectory = await mkdtemp(path.join(tmpdir(), 'mcjspacker-example-'));

  try {
    await execFileAsync(process.execPath, [path.join(projectDir, 'example', 'datapack.js')], {
      cwd: temporaryDirectory,
    });

    const actualOutput = await readOutputTree(path.join(temporaryDirectory, 'output'));
    const expectedOutput = JSON.parse(await readFile(expectedOutputPath, 'utf8'));

    assert.deepEqual(actualOutput, expectedOutput);
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
});
