import {SyntaxToken} from "./syntax-token.ts";
import {SyntaxKind} from "./syntax-kind.ts";
import {ExpressionSyntax} from "./expression.syntax.ts";

export class NumberExpressionSyntax extends ExpressionSyntax {
    public readonly kind: SyntaxKind;
    public readonly children: SyntaxToken[];

    constructor(public numberToken: SyntaxToken) {
        super();
        this.kind = SyntaxKind.NumberExpression;
        this.children = [this.numberToken];
    }
}
