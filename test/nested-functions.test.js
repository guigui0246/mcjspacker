import assert from 'node:assert/strict';
import test from 'node:test';
import { generateOutput } from './helpers.js';

test('generates inline and nested functions with namespaced calls', async () => {
  const output = await generateOutput(`
    import { createMCF } from '__PACKAGE__';
    const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
    mcf.example_inline_anonymous\`
      execute as @a[tag=test] run \${mcf\`say hello from inner function\`}
      say hello from outer function
    \`;
    mcf.wow.test_anonymous2\`\${mcf.wow.anonymous\`say hello from anonymous function\`}\`;
  `);

  assert.deepEqual(
    {
      'example_inline_anonymous.mcfunction': output['example_inline_anonymous.mcfunction'],
      'wow/test_anonymous2.mcfunction': output['wow/test_anonymous2.mcfunction'],
    },
    {
      'example_inline_anonymous.mcfunction': 'execute as @a[tag=test] run function test:generated/anonymous/anonymous_1\nsay hello from outer function',
      'wow/test_anonymous2.mcfunction': 'function test:generated/wow/anonymous/anonymous_1',
    },
  );
});
