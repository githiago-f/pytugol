import {TextSpan} from "./text-span.ts";
import {SourceText} from "./source-text.ts";

export class TextLine {
    public constructor(
        public readonly text: SourceText,
        public readonly start: number,
        public readonly length: number,
        public readonly lengthIncludingLineBreak: number,
    ) {}

    get end() {
        return this.start + this.length;
    }

    get span() {
        return new TextSpan(this.start, this.length);
    }

    get spanIncludingLineBreak() {
        return new TextSpan(this.start, this.lengthIncludingLineBreak);
    }
}
