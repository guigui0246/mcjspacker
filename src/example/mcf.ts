import { createMCF } from '../index.js';

const mcf = createMCF({
  outputDir: 'output',
  functionCallPrefix: 'test:generated/'
});

export default mcf;
