import { createMCF } from '../index.ts';

const mcf = createMCF({
  outputDir: 'output',
  functionCallPrefix: 'test:generated/'
});

export default mcf;
