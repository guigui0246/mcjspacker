import assert from 'node:assert/strict';
import test from 'node:test';
import { generateOutput } from './helpers.js';

test('generates recursive function calls', async () => {
  const output = await generateOutput(`
    import { createMCF } from '__PACKAGE__';
    const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
    const recursive = mcf.recursive;
    recursive\`
      scoreboard players add @s example 1
      say hello
      execute if score @s example matches ..10 run \${recursive}
    \`;
    mcf.recursive2\`
      scoreboard players add @s example 1
      say hello
      execute if score @s example matches ..10 run \${mcf.recursive2}
    \`;
  `);

  assert.deepEqual(
    {
      'recursive.mcfunction': output['recursive.mcfunction'],
      'recursive2.mcfunction': output['recursive2.mcfunction'],
    },
    {
      'recursive.mcfunction': 'scoreboard players add @s example 1\nsay hello\nexecute if score @s example matches ..10 run function test:generated/recursive',
      'recursive2.mcfunction': 'scoreboard players add @s example 1\nsay hello\nexecute if score @s example matches ..10 run function test:generated/recursive2',
    },
  );
});