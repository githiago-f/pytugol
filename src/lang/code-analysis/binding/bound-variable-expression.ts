import {BoundExpression} from "./bound-expression.ts";
import {BoundNodeKind} from "./bound-node-kind.ts";
import {VariableSymbol} from "../variable-symbol.ts";

export class BoundVariableExpression extends BoundExpression {
    public override readonly kind = BoundNodeKind.VariableExpression;

    constructor(public readonly variable: VariableSymbol) {
        super();
    }

    public override get type() {
        return this.variable.type;
    }
}
