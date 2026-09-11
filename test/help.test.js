import assert from 'node:assert/strict';
import test from 'node:test';
import { compileTS, generateOutput } from './helpers.js';

test('converts help instances to commands', async () => {
  const output = await generateOutput(`
    import { help, createMCF } from '__PACKAGE__';
    const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
    mcf.g1(help());
    mcf.g2(help("command"));
    mcf.g3(help("command", "subcommand"));
    mcf.g4(help(1));
    mcf.g5(help(help()));
    mcf.g\`
      \${help()}
    \`
  `);

  assert.deepEqual(
    {
      'g.mcfunction': output['g.mcfunction'],
      'g1.mcfunction': output['g1.mcfunction'],
      'g2.mcfunction': output['g2.mcfunction'],
      'g3.mcfunction': output['g3.mcfunction'],
      'g4.mcfunction': output['g4.mcfunction'],
      'g5.mcfunction': output['g5.mcfunction'],
    },
    {
      'g.mcfunction': 'help',
      'g1.mcfunction': 'help',
      'g2.mcfunction': 'help command',
      'g3.mcfunction': 'help command subcommand',
      'g4.mcfunction': 'help 1',
      'g5.mcfunction': 'help help',
    },
  );
});

test("don't compile on wrong help usage", async () => {
  await assert.rejects(compileTS(`
    import { help, createMCF } from '__PACKAGE__';
    const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
    mcf.g1(help(6, "extra"));
  `))

  await assert.rejects(compileTS(`
    import { help, createMCF } from '__PACKAGE__';
    const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
    mcf.g1(help(6, 5));
  `))

  await assert.rejects(compileTS(`
    import { help, createMCF } from '__PACKAGE__';
    const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
    mcf.g1(help("command", 5));
  `))
});
