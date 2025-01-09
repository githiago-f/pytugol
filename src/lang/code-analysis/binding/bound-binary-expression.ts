import {BoundExpression} from "./bound-expression.ts";
import {BoundNodeKind} from "./bound-node-kind.ts";
import {BoundBinaryOperator} from "./bound-binary-operator.ts";

export enum BoundBinaryOperatorKind {
    Addition = 'Addition',
    Subtraction = 'Subtraction',
    Multiplication = 'Multiplication',
    Division = 'Division',
    LogicalOr = 'LogicalOr',
    LogicalAnd = 'LogicalAnd',
    Equals = 'Equals',
    NotEquals = 'NotEquals',
    GreaterThan = 'GreaterThan',
    GreaterEqualThan = 'GreaterEqualThan',
    LessEqualThan = 'LessEqualThan',
    LessThan = 'LessThan',
}

export class BoundBinaryExpression extends BoundExpression {
    constructor(
        public readonly left: BoundExpression,
        public readonly operator: BoundBinaryOperator,
        public readonly right: BoundExpression,
    ) {
        super();
    }

    override get kind(): BoundNodeKind {
        return BoundNodeKind.BinaryExpression;
    }

    override get type() {
        return this.operator.resultType;
    }
}
