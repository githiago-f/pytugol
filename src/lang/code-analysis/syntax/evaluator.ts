import {ExpressionSyntax} from "./expression.syntax.ts";
import {LiteralExpressionSyntax} from "./literal-expression.syntax.ts";
import {BinaryExperssionSyntax} from "./binary-experssion.syntax.ts";
import {SyntaxKind} from "./syntax-kind.ts";
import {ParenthesizedExpressionSyntax} from "./parenthesized-expression.syntax.ts";
import {UnaryExpressionSyntax} from "./unary-expression.syntax.ts";

export class Evaluator {
    constructor(private readonly _root: ExpressionSyntax) {}

    public evaluate() {
        return this.evaluateExpression(this._root);
    }

    private evaluateExpression(node: ExpressionSyntax): number {
        if(node instanceof LiteralExpressionSyntax) {
            return node.literalToken.value as number;
        }

        if(node instanceof UnaryExpressionSyntax) {
            const operand = this.evaluateExpression(node.operand);
            switch (node.operatorToken.kind) {
                case SyntaxKind.PlusToken:
                    return operand;
                case SyntaxKind.MinusToken:
                    return -operand;
                default:
                    throw new Error("Unexpected unary expression");
            }
        }

        if(node instanceof BinaryExperssionSyntax) {
            const left = this.evaluateExpression(node.left);
            const right = this.evaluateExpression(node.right);

            switch(node.operatorToken.kind) {
                case SyntaxKind.PlusToken:
                    return left + right;
                case SyntaxKind.MinusToken:
                    return left - right;
                case SyntaxKind.StarToken:
                    return left * right;
                case SyntaxKind.SlashToken:
                    return left / right;
                default:
                    throw new Error("Unrecognized expression: " + node.kind);
            }
        }

        if(node instanceof ParenthesizedExpressionSyntax) {
            return this.evaluateExpression(node.expression);
        }

        throw new Error("Unrecognized expression: " + node.kind);
    }
}
