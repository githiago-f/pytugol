import {SyntaxToken} from "../syntax/syntax-token.ts";
import {SyntaxKind} from "../syntax/syntax-kind.ts";
import {ExpressionSyntax} from "./expression.syntax.ts";

export class LiteralExpressionSyntax extends ExpressionSyntax {
    public readonly kind: SyntaxKind;
    public readonly children: SyntaxToken[];

    constructor(public literalToken: SyntaxToken) {
        super();
        this.kind = SyntaxKind.LiteralExpression;
        this.children = [this.literalToken];
    }
}
