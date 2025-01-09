import {BoundNodeKind} from "./bound-node-kind.ts";
import {BoundExpression} from "./bound-expression.ts";
import {BoundUnaryOperator} from "./bound-unary-operator.ts";

export enum BoundUnaryOperatorKind {
    IDENTITY = 'Identity',
    NEGATION = 'Negation',
    LOGICAL_NEGATION = 'LogicalNegation',
}

export class BoundUnaryExpression extends BoundExpression {
    constructor(
        public readonly operator: BoundUnaryOperator,
        public readonly  operand: BoundExpression
    ) {
        super();
    }

    override get kind(): BoundNodeKind {
        return BoundNodeKind.UnaryExpression;
    }

    override get type() {
        return this.operator.resultType;
    }
}
