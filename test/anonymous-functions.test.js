import assert from 'node:assert/strict';
import test from 'node:test';
import { generateOutput } from './helpers.js';

test('generates anonymous functions in the correct folders', async () => {
  const output = await generateOutput(`
    import { createMCF } from '__PACKAGE__';
    const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
    mcf.a.anonymous\`say testing a.anonymous functions from different sources 1\`;
    mcf.a.anonymous\`say testing a.anonymous functions from different sources 2\`;
    mcf\`say hello from anonymous function\`;
    mcf.anonymous\`say hello from inner function\`;
    mcf.anonymous\`$say $(message)\`;
    mcf.anonymous\`say testing anonymous functions from different sources 1\`;
    mcf.anonymous\`say testing anonymous functions from different sources 2\`;
    mcf.wow.anonymous\`say hello from anonymous function\`;
  `);

  assert.deepEqual(
    Object.fromEntries(Object.entries(output).filter(([file]) => file.includes('anonymous/'))),
    {
      'a/anonymous/anonymous_1.mcfunction': 'say testing a.anonymous functions from different sources 1',
      'a/anonymous/anonymous_2.mcfunction': 'say testing a.anonymous functions from different sources 2',
      'anonymous/anonymous_1.mcfunction': 'say hello from anonymous function',
      'anonymous/anonymous_2.mcfunction': 'say hello from inner function',
      'anonymous/anonymous_3.mcfunction': '$say $(message)',
      'anonymous/anonymous_4.mcfunction': 'say testing anonymous functions from different sources 1',
      'anonymous/anonymous_5.mcfunction': 'say testing anonymous functions from different sources 2',
      'wow/anonymous/anonymous_1.mcfunction': 'say hello from anonymous function',
    },
  );
});