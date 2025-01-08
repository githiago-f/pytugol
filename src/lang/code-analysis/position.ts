type LinePosition = { line: number, column: number };
type Range = [number, number];

export class Position {
    public range: Range;
    public start: LinePosition;
    public end: LinePosition;

    constructor(start: LinePosition, end: LinePosition, range: Range = [0, 0]) {
        this.range = range;
        this.start = start;
        this.end = end;
    }
}
