export class ProgramCounter {
    public static instance = new ProgramCounter();

    private _counter: number;
    private _lines: string[];
    private _stack: number[];
    private _finished: boolean;
    private _returnRegister: any | undefined;

    private constructor(lines: string[] = []) {
        this._lines = lines;
        this._stack = [];
        this._finished = false;
        this._returnRegister = undefined;
        this._counter = 0;
    }

    public static reset(lines: string[]) {
        this.instance = new ProgramCounter(lines);
    }

    get current() { return this._counter; }

    get currentLine() { return this._lines[this._counter]; }

    get lines() { return this._lines; }

    get length() { return this._lines.length; }

    get isNotFinished() { return this._finished || this._counter < this.length; }

    get returnRegister() {
        const returnValue = this._returnRegister;
        this._returnRegister = undefined;
        return returnValue;
    }

    public goto(n: number) {
        this._counter = n;
    }

    public next() {
        this._counter++;
        return this._counter;
    }

    public return(value: any | undefined = undefined) {
        const goto = this._stack.pop();
        if(goto === undefined) {
            this._finished = true;
            throw new Error('Impossível retornar da raiz do programa');
        }
        this._counter = goto;
        this._returnRegister = value;
    }
}