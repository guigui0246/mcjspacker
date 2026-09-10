import assert from 'node:assert/strict';
import test from 'node:test';
import { generateOutput } from './helpers.js';

test('generates named functions and function calls', async () => {
  const output = await generateOutput(`
    import { createMCF } from '__PACKAGE__';
    const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
    const funcA = mcf.a\`say hello\`;
    const funcB = mcf.b\`say world\`;
    mcf.test\`
      \${funcA}
      \${funcB}
    \`;
  `);

  assert.deepEqual(
    Object.fromEntries(Object.entries(output).filter(([file]) => ['a.mcfunction', 'b.mcfunction', 'test.mcfunction'].includes(file))),
    {
      'a.mcfunction': 'say hello',
      'b.mcfunction': 'say world',
      'test.mcfunction': 'function test:generated/a\nfunction test:generated/b',
    },
  );
});