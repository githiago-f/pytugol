import {SyntaxKind} from "../syntax/syntax-kind.ts";
import {BoundBinaryOperatorKind} from "./bound-binary-expression.ts";
import {InternalType} from "../internal-types.ts";

export class BoundBinaryOperator {
    private constructor(
        public readonly syntaxKind: SyntaxKind,
        public readonly kind: BoundBinaryOperatorKind,
        public readonly leftType: InternalType,
        public readonly rightType = leftType,
        public readonly resultType = rightType
    ) {}

    private static _operators = [
        new BoundBinaryOperator(SyntaxKind.AndToken, BoundBinaryOperatorKind.LogicalAnd, 'boolean'),
        new BoundBinaryOperator(SyntaxKind.OrToken, BoundBinaryOperatorKind.LogicalOr, 'boolean'),

        new BoundBinaryOperator(SyntaxKind.EqEqToken, BoundBinaryOperatorKind.Equals, 'boolean'),
        new BoundBinaryOperator(SyntaxKind.NEqToken, BoundBinaryOperatorKind.NotEquals, 'boolean'),

        new BoundBinaryOperator(SyntaxKind.PlusToken, BoundBinaryOperatorKind.Addition, 'number'),
        new BoundBinaryOperator(SyntaxKind.MinusToken, BoundBinaryOperatorKind.Subtraction, 'number'),
        new BoundBinaryOperator(SyntaxKind.StarToken, BoundBinaryOperatorKind.Multiplication, 'number'),
        new BoundBinaryOperator(SyntaxKind.SlashToken, BoundBinaryOperatorKind.Division, 'number'),

        new BoundBinaryOperator(SyntaxKind.EqEqToken, BoundBinaryOperatorKind.Equals, 'number', 'number', 'boolean'),
        new BoundBinaryOperator(SyntaxKind.NEqToken, BoundBinaryOperatorKind.NotEquals, 'number', 'number', 'boolean'),
        new BoundBinaryOperator(SyntaxKind.GtToken, BoundBinaryOperatorKind.GreaterThan, 'number', 'number', 'boolean'),
        new BoundBinaryOperator(SyntaxKind.GteToken, BoundBinaryOperatorKind.GreaterEqualThan, 'number', 'number', 'boolean'),
        new BoundBinaryOperator(SyntaxKind.LtToken, BoundBinaryOperatorKind.LessThan, 'number', 'number', 'boolean'),
        new BoundBinaryOperator(SyntaxKind.LteToken, BoundBinaryOperatorKind.LessEqualThan, 'number', 'number', 'boolean'),
    ];

    static bind(kind: SyntaxKind, leftType: string, rightType: string) {
        for (const operator of this._operators) {
            if(operator.syntaxKind === kind && operator.leftType === leftType && operator.rightType === rightType)
                return operator;
        }

        return null;
    }
}
