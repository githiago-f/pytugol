import {SyntaxKind} from "../syntax/syntax-kind.ts";
import {SyntaxNode} from "../syntax/syntax-node.ts";
import {ExpressionSyntax} from "./expression.syntax.ts";
import {SyntaxToken} from "../syntax/syntax-token.ts";

export class UnaryExpressionSyntax extends ExpressionSyntax {
    public readonly kind = SyntaxKind.UnaryExpression;
    public readonly children: SyntaxNode[];

    constructor(
        public readonly operatorToken: SyntaxToken,
        public readonly operand: ExpressionSyntax,
    ) {
        super();
        this.children = [operatorToken, operand];
    }
}
