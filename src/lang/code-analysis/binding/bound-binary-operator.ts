import {SyntaxKind} from "../syntax/syntax-kind.ts";
import {BoundBinaryOperatorKind} from "./bound-binary-expression.ts";

export class BoundBinaryOperator {
    private constructor(
        public readonly syntaxKind: SyntaxKind,
        public readonly kind: BoundBinaryOperatorKind,
        public readonly leftType: string,
        public readonly rightType: string,
        public readonly resultType?: string
    ) {}

    private static _operators = [
        new BoundBinaryOperator(SyntaxKind.AndToken, BoundBinaryOperatorKind.LogicalAnd, 'boolean', 'boolean'),
        new BoundBinaryOperator(SyntaxKind.OrToken, BoundBinaryOperatorKind.LogicalOr, 'boolean', 'boolean'),

        new BoundBinaryOperator(SyntaxKind.PlusToken, BoundBinaryOperatorKind.Addition, 'number', 'number'),
        new BoundBinaryOperator(SyntaxKind.MinusToken, BoundBinaryOperatorKind.Subtraction, 'number', 'number'),
        new BoundBinaryOperator(SyntaxKind.StarToken, BoundBinaryOperatorKind.Multiplication, 'number', 'number'),
        new BoundBinaryOperator(SyntaxKind.SlashToken, BoundBinaryOperatorKind.Division, 'number', 'number'),
    ];

    static bind(kind: SyntaxKind, leftType: string, rightType: string) {
        for (const operator of this._operators) {
            if(operator.syntaxKind === kind && operator.leftType === leftType && operator.rightType === rightType)
                return operator;
        }

        return null;
    }
}
