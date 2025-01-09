import {ExpressionSyntax} from "../syntax/expression.syntax.ts";
import {SyntaxKind} from "../syntax/syntax-kind.ts";
import {LiteralExpressionSyntax} from "../syntax/literal-expression.syntax.ts";
import {UnaryExpressionSyntax} from "../syntax/unary-expression.syntax.ts";
import {BinaryExperssionSyntax} from "../syntax/binary-experssion.syntax.ts";
import {BoundExpression} from "./bound-expression.ts";
import {BoundLiteralExpression} from "./bound-literal-expression.ts";
import {BoundUnaryExpression, BoundUnaryOperatorKind} from "./bound-unary-expression.ts";
import {BoundBinaryExpression, BoundBinaryOperatorKind} from "./bound-binary-expression.ts";

export class Binder {
    public readonly diagnostics: string[] = [];

    public bindExpression(syntax: ExpressionSyntax): BoundExpression {
        switch (syntax.kind) {
            case SyntaxKind.LiteralExpression:
                return this.bindLiteralExpression(syntax as LiteralExpressionSyntax);
            case SyntaxKind.UnaryExpression:
                return this.bindUnaryExpression(syntax as UnaryExpressionSyntax);
            case SyntaxKind.BinaryExpression:
                return this.bindBinaryExpression(syntax as BinaryExperssionSyntax);
            default:
                throw new Error(`Unknown syntax ${syntax.kind}`);
        }
    }

    private bindLiteralExpression(syntax: LiteralExpressionSyntax) {
        const value = (syntax.value as number) ?? 0;
        return new BoundLiteralExpression(value);
    }

    private bindUnaryExpression(syntax: UnaryExpressionSyntax) {
        const boundOperand = this.bindExpression(syntax.operand);
        const boundOperator = this.bindUnaryOperatorKind(syntax.operatorToken.kind, boundOperand.type);

        if(boundOperator === null) {
            this.diagnostics.push(`ERROR: Unary operator ${syntax.operatorToken.text} is not defined for ${boundOperand.type}`);
            return boundOperand;
        }

        return new BoundUnaryExpression(boundOperator, boundOperand);
    }

    private bindBinaryExpression(syntax: BinaryExperssionSyntax) {
        const boundLeft = this.bindExpression(syntax.left);
        const boundRight = this.bindExpression(syntax.right);
        const boundOperator = this.bindBinaryOperatorKind(
            syntax.operatorToken.kind,
            boundLeft.type,
            boundRight.type
        );

        if(boundOperator === null) {
            this.diagnostics.push(
                `ERROR: Binary operator ${syntax.operatorToken.text} is not defined for ${boundLeft.type} and ${boundRight.type}`);
            return boundLeft;
        }

        return new BoundBinaryExpression(boundLeft, boundOperator, boundRight);
    }

    private bindUnaryOperatorKind(kind: SyntaxKind, operandType: string): BoundUnaryOperatorKind | null {
        if(operandType === 'number') {
            switch (kind) {
                case SyntaxKind.PlusToken:
                    return BoundUnaryOperatorKind.IDENTITY;
                case SyntaxKind.MinusToken:
                    return BoundUnaryOperatorKind.NEGATION;
            }
        }

        if (operandType === 'boolean') {
            switch (kind) {
                case SyntaxKind.NotToken:
                    return BoundUnaryOperatorKind.LOGICAL_NEGATION;
            }
        }

        return null;
    }

    private bindBinaryOperatorKind(kind: SyntaxKind, left: string, right: string): BoundBinaryOperatorKind | null {
        if(left === 'number' && right === 'number') {
            switch (kind) {
                case SyntaxKind.PlusToken:
                    return BoundBinaryOperatorKind.Addition;
                case SyntaxKind.MinusToken:
                    return BoundBinaryOperatorKind.Subtraction;
                case SyntaxKind.StarToken:
                    return BoundBinaryOperatorKind.Multiplication;
                case SyntaxKind.SlashToken:
                    return BoundBinaryOperatorKind.Division;
            }
        }

        if(left === 'boolean' && right === 'boolean') {
            switch (kind) {
                case SyntaxKind.AndToken:
                    return BoundBinaryOperatorKind.LogicalAnd;
                case SyntaxKind.OrToken:
                    return BoundBinaryOperatorKind.LogicalOr;
            }
        }

        return null;
    }
}
