import {TextLine} from "./text-line.ts";
import {TextSpan} from "./text-span.ts";

export class SourceText {
    public readonly lines: readonly TextLine[];

    private constructor(public readonly text: string) {
        this.lines = SourceText.parseLines(this, text);
    }

    public static from(text: string): SourceText {
        return new SourceText(text);
    }

    private static parseLines(srcText: SourceText, text: string): readonly TextLine[] {
        const array: TextLine[] = [];
        let position = 0, lineStart = 0;
        for (; position < text.length;) {
            const lineBreakWidth = this.getLineBreakWidth(text, position);

            if (lineBreakWidth === 0) {
                position++;
                continue;
            }

            const lineLength = position - lineStart;
            const lineLengthIncludingLineBreak = lineBreakWidth + lineLength;

            array.push(new TextLine(srcText, lineStart, lineLength, lineLengthIncludingLineBreak));

            position += lineBreakWidth;
            lineStart = position;
        }

        if (position > lineStart) {
            array.push(new TextLine(srcText, lineStart, position, 0));
        }

        return array;
    }

    private static getLineBreakWidth(text: string, i: number) {
        const c = text[i];
        const l = i >= text.length ? '\0' : text[i + 1];
        if (c === '\r' && l === '\n') {
            return 2;
        }
        if (c === '\r' || c === '\n') {
            return 1;
        }
        return 0;
    }

    public getLineIndex(position: number): number {
        let lo = 0, hi = this.lines.length - 1;

        while (lo <= hi) {
            const mid = Math.floor(lo + ((hi - lo) / 2));
            const start = this.lines[mid].start;

            if(position === start) return mid;
            if(position > start) hi = mid - 1;
            else lo = mid + 1;
        }

        return lo;
    }

    get(index: number): string {
        return this.text[index];
    }

    get length(): number {
        return this.text.length;
    }

    getByRange(start: number, length: number = this.length) {
        return this.text.substring(start, length);
    }

    getBySpan(span: TextSpan) {
        return this.text.substring(span.start, span.end);
    }
}
