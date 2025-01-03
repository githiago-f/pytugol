

export function tokenizer(code: string) {
    const lines = code.replace(/\/\*[^]+\*\//gi, '')
        .replace(/\/\/[^\n]*/gi, '')
        .split('\n')
        .map(i => i.trim())
        .filter(i => i !== '');

    console.log(lines);

    return lines;
}
