import {BoundExpression} from "./bound-expression.ts";
import {BoundNodeKind} from "./bound-node-kind.ts";

export enum BoundBinaryOperatorKind {
    Addition = 'Addition',
    Subtraction = 'Subtraction',
    Multiplication = 'Multiplication',
    Division = 'Division',
}

export class BoundBinaryExpression extends BoundExpression {
    constructor(
        public readonly left: BoundExpression,
        public readonly operatorKind: BoundBinaryOperatorKind,
        public readonly right: BoundExpression,
    ) {
        super();
    }

    override get kind(): BoundNodeKind {
        return BoundNodeKind.BinaryExpression;
    }

    override get type() {
        return this.left.type;
    }
}