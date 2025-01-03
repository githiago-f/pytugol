import {Types, whichType} from "./typings.ts";

export class MemorySpace {
    public static instance: MemorySpace = new MemorySpace();
    static reset() {
        this.instance = new MemorySpace();
    }

    private _variables: Map<string, { type: Types, value: any }>;

    private constructor() {
        this._variables = new Map();
    }

    public get(name: string) {
        return this._variables.get(name);
    }

    public set(name: string, value: any, type?: Types) {
        this._variables.set(name, { type: type ?? whichType(value), value});
    }
}
