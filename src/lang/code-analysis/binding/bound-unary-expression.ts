import {BoundNodeKind} from "./bound-node-kind.ts";
import {BoundExpression} from "./bound-expression.ts";

export enum BoundUnaryOperatorKind {
    IDENTITY = 'Identity',
    NEGATION = 'Negation',
    LOGICAL_NEGATION = 'LogicalNegation',
}

export class BoundUnaryExpression extends BoundExpression {
    constructor(
        public readonly operatorKind: BoundUnaryOperatorKind,
        public readonly  operand: BoundExpression
    ) {
        super();
    }

    override get kind(): BoundNodeKind {
        return BoundNodeKind.UnaryExpression;
    }

    override get type() {
        return this.operand.type;
    }
}
