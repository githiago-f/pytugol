import {SyntaxKind} from "../syntax/syntax-kind.ts";
import {BoundUnaryOperatorKind} from "./bound-unary-expression.ts";

export class BoundUnaryOperator {
    private constructor(
        public readonly syntaxKind: SyntaxKind,
        public readonly kind: BoundUnaryOperatorKind,
        public readonly operandType: string,
        public readonly resultType?: string
    ) {}

    private static _operators = [
        new BoundUnaryOperator(SyntaxKind.NotToken, BoundUnaryOperatorKind.LOGICAL_NEGATION, 'boolean'),

        new BoundUnaryOperator(SyntaxKind.PlusToken, BoundUnaryOperatorKind.IDENTITY, 'number'),
        new BoundUnaryOperator(SyntaxKind.MinusToken, BoundUnaryOperatorKind.NEGATION, 'number'),
    ];

    static bind(kind: SyntaxKind, operandType: string) {
        for (const operator of this._operators) {
            if(operator.syntaxKind === kind && operator.operandType === operandType)
                return operator;
        }

        return null;
    }
}
