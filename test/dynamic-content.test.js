import assert from 'node:assert/strict';
import test from 'node:test';
import { generateOutput } from './helpers.js';

test('generates content from JavaScript values', async () => {
  const output = await generateOutput(`
    import { createMCF } from '__PACKAGE__';
    const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
    const items = [
      { name: 'platform', model: 'redstone_block' },
      { name: 'slime_block', model: 'slime_block' },
    ];
    let book = '';
    for (const item of items) {
      book += \`give @s item_frame[item_name='\${item.name}',item_model='\${item.model}']\\n\`;
    }
    mcf.book\`\${book}\`;
  `);

  assert.equal(
    output['book.mcfunction'],
    "give @s item_frame[item_name='platform',item_model='redstone_block']\ngive @s item_frame[item_name='slime_block',item_model='slime_block']",
  );
});

test('preserves Minecraft macros and expands their calls', async () => {
  const output = await generateOutput(`
    import { createMCF } from '__PACKAGE__';
    const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
    mcf.example_macro\`
      \${mcf\`$say \$(message)\`} {message: 'hello'}
    \`;
  `);

  assert.equal(output['example_macro.mcfunction'], "function test:generated/anonymous/anonymous_1 {message: 'hello'}");
});
