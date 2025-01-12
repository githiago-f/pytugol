import {BoundExpression} from "./bound-expression.ts";
import {BoundNodeKind} from "./bound-node-kind.ts";
import {VariableSymbol} from "../variable-symbol.ts";

export class BoundAssignmentExpression extends BoundExpression {
    public override readonly kind = BoundNodeKind.AssignmentExpression;

    constructor(
        public readonly variable: VariableSymbol,
        public readonly expression: BoundExpression
    ) {
        super();
    }

    public override get type() {
        return this.expression.type;
    }
}
