export type Context = {
    [prop: string]: Context;
    [Symbol.toStringTag]: () => string;
    [Symbol.toPrimitive]: () => string;
    (...args: unknown[]): Context;
};
export declare function createMCF({ outputDir, functionCallPrefix }: {
    outputDir: string;
    functionCallPrefix: string;
}): Context;
//# sourceMappingURL=index.d.ts.map