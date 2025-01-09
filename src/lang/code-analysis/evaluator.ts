import {BoundExpression} from "./binding/bound-expression.ts";
import {BoundLiteralExpression} from "./binding/bound-literal-expression.ts";
import {BoundUnaryExpression, BoundUnaryOperatorKind} from "./binding/bound-unary-expression.ts";
import {BoundBinaryExpression, BoundBinaryOperatorKind} from "./binding/bound-binary-expression.ts";

export class Evaluator {
    constructor(private readonly _root: BoundExpression) {}

    public evaluate(): any {
        return this.evaluateExpression(this._root);
    }

    private evaluateExpression(exp: BoundExpression): any {
        if(exp instanceof BoundLiteralExpression) {
            return exp.value;
        }

        if(exp instanceof BoundUnaryExpression) {
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

        if(exp instanceof BoundBinaryExpression) {
            const left = this.evaluateExpression(exp.left);
            const right = this.evaluateExpression(exp.right);

            switch(exp.operator.kind) {
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
                default:
                    throw new Error("Unrecognized expression: " + exp.kind);
            }
        }

        throw new Error("Unrecognized expression: " + exp.kind);
    }
}
