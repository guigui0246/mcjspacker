import { deleteDirectory, saveFile, combinePaths, isValidPathPart, toSnakeCase, moveFolder } from './tools.js';
import { getFunctionContent } from './parser.js';
export function createMCF({ outputDir, functionCallPrefix }) {
    const tempOutputDir = `${outputDir}.tmp`;
    const deleteTempDirectoryPromise = deleteDirectory(tempOutputDir);
    const writes = [];
    let success = true;
    const nextAnonymousIds = {};
    async function finalize() {
        await deleteTempDirectoryPromise;
        await Promise.all(writes);
        // TODO: run spyglassmc to check for errors and warn for each error instead of throwing. An error does not affect success
        if (success) {
            await moveFolder(tempOutputDir, outputDir);
            await deleteDirectory(tempOutputDir);
            console.log(`Datapack generated successfully in ${outputDir}`);
        }
        else {
            throw new Error("Failed to generate datapack, see errors above.\nTemporary files are in " + tempOutputDir);
        }
    }
    process.once('beforeExit', () => {
        void finalize().catch(error => {
            console.error(error);
            process.exitCode = 1;
        });
    });
    function createAnonymousContext(functionPath) {
        if (functionPath === '') {
            functionPath = 'anonymous';
        }
        let id = nextAnonymousIds[functionPath] = (nextAnonymousIds[functionPath] || 0) + 1;
        return createContext(`${functionPath}/anonymous_${id}`);
    }
    function createContext(functionPath) {
        // replacing only the first / to :
        const createsAnonymousFunctions = functionPath === '' || functionPath === 'anonymous' || functionPath.endsWith('/anonymous');
        const asString = createsAnonymousFunctions ?
            '[ERR anonymous function]' :
            `function ${combinePaths(functionCallPrefix, functionPath).replace('/', ':')}`;
        function get(_target, prop) {
            if (prop === Symbol.toStringTag || prop === Symbol.toPrimitive) {
                return () => asString;
            }
            if (typeof prop === 'symbol') {
                return Reflect.get(_target, prop);
            }
            prop = toSnakeCase(`${prop}`);
            if (!isValidPathPart(prop)) {
                throw new Error(`Invalid path: '${prop}'`);
            }
            return createContext(combinePaths(functionPath, prop));
        }
        function set(_target, _prop, _value) {
            return false;
        }
        function target(...args) {
            if (createsAnonymousFunctions) {
                return createAnonymousContext(functionPath)(...args);
            }
            let functionContent;
            try {
                functionContent = getFunctionContent(...args);
            }
            catch (error) {
                console.error(error);
                success = false;
                return proxy;
            }
            writes.push(deleteTempDirectoryPromise.then(() => saveFile(tempOutputDir, functionPath, functionContent).catch(err => {
                console.error(err);
                success = false;
            })).catch(err => {
                console.error(err);
                success = false;
            }));
            return proxy;
        }
        const proxy = new Proxy(target, { get, set });
        return proxy;
    }
    return createContext('');
}
//# sourceMappingURL=context.js.map