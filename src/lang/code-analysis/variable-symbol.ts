import {InternalType} from "./internal-types.ts";

export class VariableSymbol {
    constructor(
        public readonly name: string,
        public readonly type: InternalType
    ) { }
}
