import assert from 'node:assert/strict';
import test from 'node:test';
import { generateOutput } from './helpers.js';

test('converts Command instances to commands', async () => {
  const output = await generateOutput(`
    import { Command, createMCF } from '__PACKAGE__';
    const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
    mcf.g1(new Command('help'));
    mcf.g2(new Command('tp player'));
    mcf.g3(new Command('tp player entity'));
    mcf.g4(new Command('tp', 'player'));
    mcf.g5(new Command('tp', 'player', 'entity'));
    mcf.g6(new Command('tp', 'player', new Command('entity')));
    mcf.g\`
      \${new Command('help')}
      \${new Command('tp player')}
      \${new Command('tp player entity')}
      \${new Command('tp', 'player')}
      \${new Command('tp', 'player', 'entity')}
    \`;
  `);

  assert.deepEqual(
    {
      'g.mcfunction': output['g.mcfunction'],
      'g1.mcfunction': output['g1.mcfunction'],
      'g2.mcfunction': output['g2.mcfunction'],
      'g3.mcfunction': output['g3.mcfunction'],
      'g4.mcfunction': output['g4.mcfunction'],
      'g5.mcfunction': output['g5.mcfunction'],
      'g6.mcfunction': output['g6.mcfunction'],
    },
    {
      'g.mcfunction': 'help\ntp player\ntp player entity\ntp player\ntp player entity',
      'g1.mcfunction': 'help',
      'g2.mcfunction': 'tp player',
      'g3.mcfunction': 'tp player entity',
      'g4.mcfunction': 'tp player',
      'g5.mcfunction': 'tp player entity',
      'g6.mcfunction': 'tp player entity',
    },
  );
});
