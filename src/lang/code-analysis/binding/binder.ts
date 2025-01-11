import {ExpressionSyntax} from "../syntax/expression.syntax.ts";
import {SyntaxKind} from "../syntax/syntax-kind.ts";
import {LiteralExpressionSyntax} from "../syntax/literal-expression.syntax.ts";
import {UnaryExpressionSyntax} from "../syntax/unary-expression.syntax.ts";
import {BinaryExperssionSyntax} from "../syntax/binary-experssion.syntax.ts";
import {BoundExpression} from "./bound-expression.ts";
import {BoundLiteralExpression} from "./bound-literal-expression.ts";
import {BoundUnaryExpression} from "./bound-unary-expression.ts";
import {BoundBinaryExpression} from "./bound-binary-expression.ts";
import {BoundBinaryOperator} from "./bound-binary-operator.ts";
import {BoundUnaryOperator} from "./bound-unary-operator.ts";
import {DiagnosticsRepository} from "../diagnostic.ts";

export class Binder {
    public readonly diagnostics: DiagnosticsRepository = new DiagnosticsRepository();

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
        const boundOperator = BoundUnaryOperator.bind(syntax.operatorToken.kind, boundOperand.type);

        if(boundOperator === null) {
            this.diagnostics.reportUndefinedUnaryOperator(syntax.operatorToken, boundOperand.type);
            return boundOperand;
        }

        return new BoundUnaryExpression(boundOperator, boundOperand);
    }

    private bindBinaryExpression(syntax: BinaryExperssionSyntax) {
        const boundLeft = this.bindExpression(syntax.left);
        const boundRight = this.bindExpression(syntax.right);
        const boundOperator = BoundBinaryOperator.bind(
            syntax.operatorToken.kind,
            boundLeft.type,
            boundRight.type
        );

        if(boundOperator === null) {
            this.diagnostics.reportUndefinedBinaryOperator(syntax.operatorToken, boundLeft.type, boundRight.type);
            return boundLeft;
        }

        return new BoundBinaryExpression(boundLeft, boundOperator, boundRight);
    }
}
