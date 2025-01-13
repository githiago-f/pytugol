import {BoundExpression} from "./binding/bound-expression.ts";
import {BoundLiteralExpression} from "./binding/bound-literal-expression.ts";
import {BoundUnaryExpression, BoundUnaryOperatorKind} from "./binding/bound-unary-expression.ts";
import {BoundBinaryExpression, BoundBinaryOperatorKind} from "./binding/bound-binary-expression.ts";
import {BoundVariableExpression} from "./binding/bound-variable-expression.ts";
import {BoundAssignmentExpression} from "./binding/bound-assignment-expression.ts";
import {VariableSymbol} from "./variable-symbol.ts";

export class Evaluator {
    constructor(
        private readonly _root: BoundExpression,
        private readonly _variables: Map<VariableSymbol, any>
    ) {}

    public evaluate(): any {
        return this.evaluateExpression(this._root);
    }

    private evaluateExpression(exp: BoundExpression): any {
        if(exp instanceof BoundLiteralExpression) {
            return exp.value;
        }

        if(exp instanceof BoundVariableExpression) {
            return this._variables.get(exp.variable);
        }

        if(exp instanceof BoundAssignmentExpression) {
            return this.evaluateAssignmentExpression(exp);
        }

        if(exp instanceof BoundUnaryExpression) {
            return this.evaluateUnaryExpression(exp);
        }

        if(exp instanceof BoundBinaryExpression) {
            return this.evaluateBinaryExpression(exp);
        }

        throw new Error("Unrecognized expression: " + exp.kind);
    }

    private evaluateBinaryExpression(exp: BoundBinaryExpression) {
        const left = this.evaluateExpression(exp.left);
        const right = this.evaluateExpression(exp.right);

        switch (exp.operator.kind) {
            case BoundBinaryOperatorKind.Addition:
                return (left as number) + (right as number);
            case BoundBinaryOperatorKind.Division:
                return (left as number) / (right as number);
            case BoundBinaryOperatorKind.Multiplication:
                return (left as number) * (right as number);
            case BoundBinaryOperatorKind.Subtraction:
                return (left as number) - (right as number);
            case BoundBinaryOperatorKind.LogicalOr:
                return (left as boolean) || (right as boolean);
            case BoundBinaryOperatorKind.LogicalAnd:
                return (left as boolean) && (right as boolean);

            case BoundBinaryOperatorKind.NotEquals:
                return left !== right;
            case BoundBinaryOperatorKind.Equals:
                return left === right;
            case BoundBinaryOperatorKind.LessEqualThan:
                return left <= right;
            case BoundBinaryOperatorKind.GreaterEqualThan:
                return left >= right;
            case BoundBinaryOperatorKind.LessThan:
                return left < right;
            case BoundBinaryOperatorKind.GreaterThan:
                return left > right;

            default:
                throw new Error("Unrecognized expression: " + exp.kind);
        }
    }

    private evaluateAssignmentExpression(exp: BoundAssignmentExpression) {
        const value = this.evaluateExpression(exp.expression);
        this._variables.set(exp.variable, value);
        return value;
    }

    private evaluateUnaryExpression(exp: BoundUnaryExpression) {
        const operand = this.evaluateExpression(exp.operand);
        switch (exp.operator.kind) {
            case BoundUnaryOperatorKind.IDENTITY:
                return operand;
            case BoundUnaryOperatorKind.NEGATION:
                return -(operand as number);
            case BoundUnaryOperatorKind.LOGICAL_NEGATION:
                return !(operand as boolean);
            default:
                throw new Error("Unexpected unary operator " + exp.operator.kind);
        }
    }
}
