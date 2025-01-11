export class TextSpan {
    constructor(
        public readonly start: number,
        public readonly length: number
    ) {}

    get end() {
        return this.start + this.length;
    }
}
