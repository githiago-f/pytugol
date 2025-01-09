import {SyntaxNode} from "../syntax/syntax-node.ts";
import {ExpressionSyntax} from "./expression.syntax.ts";
import {SyntaxKind} from "../syntax/syntax-kind.ts";

export class ParenthesizedExpressionSyntax extends ExpressionSyntax {
    public readonly kind: SyntaxKind;
    public readonly children: SyntaxNode[];

    constructor(
        public readonly openParenToken: SyntaxNode,
        public readonly expression: ExpressionSyntax,
        public readonly closeParenToken: SyntaxNode
    ) {
        super();
        this.kind = SyntaxKind.ParenthesizedExpression;
        this.children = [openParenToken, expression, closeParenToken];
    }
}
