export function isANumber(value: string): boolean {
  return /[0-9]/.test(value);
}

export function isWhitespace(value: string): boolean {
    return /\s/.test(value);
}
