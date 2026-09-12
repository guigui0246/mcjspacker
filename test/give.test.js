import assert from 'node:assert/strict';
import { test, suite } from 'node:test';
import { compileTS, generateOutput } from './helpers.js';

suite('give command', () => {

  test('converts give instances to commands', async () => {
    const output = await generateOutput(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.give0(give("player", "item"))
      mcf.give1(give("player", "item", 5))
      mcf.give2(give("player", "item", 5, 1))
      mcf.give3(give("player", "item", 5, 1, {}))
      mcf.give4(give("player", "item[can_place_on={blocks:'sandstone'}]"))
    `);

    assert.deepEqual(
      {
        'give0.mcfunction': output['give0.mcfunction'],
        'give1.mcfunction': output['give1.mcfunction'],
        'give2.mcfunction': output['give2.mcfunction'],
        'give3.mcfunction': output['give3.mcfunction'],
        'give4.mcfunction': output['give4.mcfunction'],
      },
      {
        'give0.mcfunction': 'give player item',
        'give1.mcfunction': 'give player item 5',
        'give2.mcfunction': 'give player item 5 1',
        'give3.mcfunction': 'give player item 5 1 {}',
        'give4.mcfunction': 'give player item[can_place_on={blocks:\'sandstone\'}]',
      },
    );
  });

  test("don't compile on wrong give amount of args", async () => {
    // Min 2 args
    await assert.rejects(compileTS(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.give1(give("1 arg"));
    `))

    // Max 5 args
    await assert.rejects(compileTS(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.give1(give("1 arg", "2 arg", 3, 4, "{}", "6 arg"));
    `))
  });

  // Types are "str, str, num, num, obj"
  test("don't compile on wrong give types", async () => {
    await assert.rejects(compileTS(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.g1(give(6, "item"));
    `))

    await assert.rejects(compileTS(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.g1(give("player", 5));
    `))

    await assert.rejects(compileTS(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.g1(give("player", "item", "amount"));
    `))

    await assert.rejects(compileTS(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.g1(give("player", "item", 5, "data"));
    `))

    await assert.rejects(compileTS(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.g1(give("player", "item", 5, 1, "json"));
    `))

    await assert.rejects(compileTS(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.g1(give("player", "item", 5, 1, 5));
    `))
  });

  test("crash on wrong values in amount", async () => {
    // Min = 1
    await assert.rejects(generateOutput(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.g1(give("player", "item", 0));
    `))

    // Min = 1
    await assert.rejects(generateOutput(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.g1(give("player", "item", -1));
    `))

    // Max = 32767
    await assert.rejects(generateOutput(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.g1(give("player", "item", 32768));
    `))
  });

  test("crash on wrong values in data", async () => {
    // Min = 0
    await assert.rejects(generateOutput(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.g1(give("player", "item", 5, -1));
    `))

    // Max = 32767
    await assert.rejects(generateOutput(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.g1(give("player", "item", 5, 32768));
    `))
  });

  test.skip("crash on wrong values in json", async () => {
    // Invalid
    await assert.rejects(generateOutput(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.g1(give("player", "item", 5, 1, {fff: -1}));
    `))

    // Block tag
    await assert.rejects(generateOutput(`
      import { give, createMCF } from '__PACKAGE__';
      const mcf = createMCF({ outputDir: 'output', functionCallPrefix: 'test:generated/' });
      mcf.g1(give("player", "item", 5, 1, {loot: -1}));
    `))
  });

  test.todo("crash on wrong values in item")

});
