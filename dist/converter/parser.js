import { Command } from "../index.js";
export function getFunctionContent(strings, ...values) {
    let functionContent;
    if (typeof strings?.toTemplate === "function") {
        let [newStrings, newValues] = strings.toTemplate();
        strings = newStrings;
        values = newValues;
    }
    if (Array.isArray(strings)) {
        functionContent = `${strings[0]}`;
        for (let i = 0; i < values.length; i++) {
            if (values[i] instanceof Command) {
                let [newStrings, newValues] = values[i].toTemplate();
                values[i] = getFunctionContent(newStrings, ...newValues);
            }
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