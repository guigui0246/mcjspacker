export function getFunctionContent(strings, ...values) {
    let functionContent;
    if (Array.isArray(strings)) {
        functionContent = `${strings[0]}`;
        for (let i = 0; i < values.length; i++) {
            functionContent += values[i];
            functionContent += strings[i + 1];
        }
    }
    else if (typeof strings === 'string') {
        functionContent = strings;
    }
    else {
        throw new Error('Invalid function content');
    }
    return functionContent
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .join('\n');
}
//# sourceMappingURL=parser.js.map