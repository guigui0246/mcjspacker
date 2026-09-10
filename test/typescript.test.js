import assert from 'node:assert/strict';
import test from 'node:test';
import { generateOutput } from './helpers.js';

test('typescript', async () => {
  const output = await generateOutput(`
    import { createMCF } from '__PACKAGE__';
    const mcf: Context = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
    const typescript = mcf.typescript;
    typescript\`
      say hello
    \`;
  `);

  assert.deepEqual(
    {
      'typescript.mcfunction': output['typescript.mcfunction'],
    },
    {
      'typescript.mcfunction': 'say hello',
    },
  );
});
