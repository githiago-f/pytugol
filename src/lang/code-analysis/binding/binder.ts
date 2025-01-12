import {ExpressionSyntax} from "../syntax/expression.syntax.ts";
import {SyntaxKind} from "../syntax/syntax-kind.ts";
import {LiteralExpressionSyntax} from "../syntax/literal-expression.syntax.ts";
import {UnaryExpressionSyntax} from "../syntax/unary-expression.syntax.ts";
import {BinaryExpressionSyntax} from "../syntax/binary-expression.syntax.ts";
import {BoundExpression} from "./bound-expression.ts";
import {BoundLiteralExpression} from "./bound-literal-expression.ts";
import {BoundUnaryExpression} from "./bound-unary-expression.ts";
import {BoundBinaryExpression} from "./bound-binary-expression.ts";
import {BoundBinaryOperator} from "./bound-binary-operator.ts";
import {BoundUnaryOperator} from "./bound-unary-operator.ts";
import {DiagnosticsRepository} from "../diagnostic.ts";
import {ParenthesizedExpressionSyntax} from "../syntax/parenthesized-expression.syntax.ts";
import {NameExpressionSyntax} from "../syntax/name-expression.syntax.ts";
import {AssignmentExpressionSyntax} from "../syntax/assignment-expression.syntax.ts";
import {BoundVariableExpression} from "./bound-variable-expression.ts";
import {BoundAssignmentExpression} from "./bound-assignment-expression.ts";
import {bindInternalDefaultValue} from "../internal-types.ts";
import {VariableSymbol} from "../variable-symbol.ts";

export class Binder {
    public readonly diagnostics: DiagnosticsRepository = new DiagnosticsRepository();

    constructor(private readonly variables: Map<VariableSymbol, any>) {}

    public bindExpression(syntax: ExpressionSyntax): BoundExpression {
        switch (syntax.kind) {
            case SyntaxKind.ParenthesizedExpression:
                return this.bindParenthesizedExpression(syntax as ParenthesizedExpressionSyntax);
            case SyntaxKind.LiteralExpression:
                return this.bindLiteralExpression(syntax as LiteralExpressionSyntax);
            case SyntaxKind.NameExpression:
                return this.bindNameExpression(syntax as NameExpressionSyntax);
            case SyntaxKind.UnaryExpression:
                return this.bindUnaryExpression(syntax as UnaryExpressionSyntax);
            case SyntaxKind.BinaryExpression:
                return this.bindBinaryExpression(syntax as BinaryExpressionSyntax);
            case SyntaxKind.AssignmentExpression:
                return this.bindAssignmentExpression(syntax as AssignmentExpressionSyntax);
            default:
                throw new Error(`Unknown syntax ${syntax.kind}`);
        }
    }

    private bindLiteralExpression(syntax: LiteralExpressionSyntax) {
        const value = syntax.value ?? null;
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

    private bindBinaryExpression(syntax: BinaryExpressionSyntax) {
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

    private bindParenthesizedExpression(syntax: ParenthesizedExpressionSyntax) {
        return this.bindExpression(syntax.expression);
    }

    private bindNameExpression(syntax: NameExpressionSyntax) {
        const name = syntax.identifier.text;

        let variable: VariableSymbol | undefined;
        for(const key of this.variables.keys()) {
            if(key.name === name) variable = key;
        }

        if(variable === undefined) {
            this.diagnostics.reportUndefinedVariable(syntax.identifier);
            return new BoundLiteralExpression(null);
        }

        return new BoundVariableExpression(variable);
    }

    private bindAssignmentExpression(syntax: AssignmentExpressionSyntax) {
        const name = syntax.identifier.text;
        const boundExpression = this.bindExpression(syntax.expression);

        let variable: VariableSymbol | undefined;
        for(const key of this.variables.keys()) {
            if(key.name === name) variable = key;
        }

        if(variable !== undefined) this.variables.delete(variable);

        variable = new VariableSymbol(name, boundExpression.type);

        const defaultValue = bindInternalDefaultValue(boundExpression.type);
        this.variables.set(variable, defaultValue);

        return new BoundAssignmentExpression(variable, boundExpression);
    }
}
