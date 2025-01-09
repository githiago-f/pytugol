import {BoundExpression} from "./binding/bound-expression.ts";
import {BoundLiteralExpression} from "./binding/bound-literal-expression.ts";
import {BoundUnaryExpression, BoundUnaryOperatorKind} from "./binding/bound-unary-expression.ts";
import {BoundBinaryExpression, BoundBinaryOperatorKind} from "./binding/bound-binary-expression.ts";

export class Evaluator {
    constructor(private readonly _root: BoundExpression) {}

    public evaluate() {
        return this.evaluateExpression(this._root);
    }

    private evaluateExpression(exp: BoundExpression): number {
        if(exp instanceof BoundLiteralExpression) {
            return exp.value;
        }

        if(exp instanceof BoundUnaryExpression) {
            const operand = this.evaluateExpression(exp.operand);
            switch (exp.operatorKind) {
                case BoundUnaryOperatorKind.IDENTITY:
                    return operand;
                case BoundUnaryOperatorKind.NEGATION:
                    return -operand;
                default:
                    throw new Error("Unexpected unary operator " + exp.operatorKind);
            }
        }

        if(exp instanceof BoundBinaryExpression) {
            const left = this.evaluateExpression(exp.left);
            const right = this.evaluateExpression(exp.right);

            switch(exp.operatorKind) {
                case BoundBinaryOperatorKind.Addition:
                    return left + right;
                case BoundBinaryOperatorKind.Division:
                    return left / right;
                case BoundBinaryOperatorKind.Multiplication:
                    return left * right;
                case BoundBinaryOperatorKind.Subtraction:
                    return left - right;
                default:
                    throw new Error("Unrecognized expression: " + exp.kind);
            }
        }

        throw new Error("Unrecognized expression: " + exp.kind);
    }
}
