import {ExpressionSyntax} from "./expression.syntax.ts";
import {SyntaxToken} from "./syntax-token.ts";
import {SyntaxKind} from "./syntax-kind.ts";
import {SyntaxNode} from "./syntax-node.ts";

export class BinaryExperssionSyntax extends ExpressionSyntax {
    public readonly kind = SyntaxKind.BinaryExpression;
    public readonly children: SyntaxNode[];

    constructor(
        public readonly left: ExpressionSyntax,
        public readonly operatorToken: SyntaxToken,
        public readonly right: ExpressionSyntax,
    ) {
        super();
        this.children = [left, operatorToken, right];
    }
}
