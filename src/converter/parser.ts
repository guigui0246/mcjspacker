export function getFunctionContent(strings: ValidParam1, ...values: ValidParam2[]): string {
  let functionContent;
  if (typeof (strings as any)?.toTemplate === "function") {
    let [newStrings, newValues] = (strings as CommandProto).toTemplate();
    strings = newStrings;
    values = newValues;
  }
  if (Array.isArray(strings)) {
    functionContent = `${strings[0]}`;
    for (let i = 0; i < values.length; i++) {
      if (typeof (values[i] as any)?.toTemplate === "function") {
        try {
          let [newStrings, newValues] = (values[i] as CommandProto).toTemplate();
          values[i] = getFunctionContent(newStrings, ...newValues);
        } catch {}
      }
      functionContent += values[i];
      functionContent += strings[i + 1];
    }
  } else if (typeof strings === 'string') {
    functionContent = strings;
  } else {
    throw new Error('Invalid function content');
  }
  return functionContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}
