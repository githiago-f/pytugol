export function matchBrackets(lines: string[], currentLine: number, bracket = '{') {
    const stack: string[] = [bracket];

    let outOfBrachIndex = currentLine;
    const closingBracket = bracket === '{' ? '}' : bracket === '[' ? ']' : bracket === '(' ? ')' : bracket == '"' ? '"' : null;

    if(closingBracket === null) {
        throw new Error(`[${currentLine}] Invalid bracket`);
    }

    for (let i = currentLine+1; i < lines.length; i++) {
        const line = lines[i];
        for(const char of line) {
            if (char === bracket) {
                stack.push(char);
            } else if (char === closingBracket) {
                stack.pop();
            }
        }
        console.log(stack);
        if(stack.length === 0) {
            outOfBrachIndex = i;
            break;
        }
    }

    if(stack.length !== 0) {
        throw new Error(`[${outOfBrachIndex}] Brackets not closed`);
    }

    return outOfBrachIndex;
}