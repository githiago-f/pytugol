import {SyntaxToken} from "./syntax-token.ts";
import {SyntaxKind} from "./syntax-kind.ts";
import {ExpressionSyntax} from "./expression.syntax.ts";

export class LiteralExpressionSyntax extends ExpressionSyntax {
    public readonly kind: SyntaxKind;
    public override readonly children: SyntaxToken[];

    constructor(
        public readonly literalToken: SyntaxToken,
        public readonly value: any = literalToken.value
    ) {
        super();
        this.kind = SyntaxKind.LiteralExpression;
        this.children = [this.literalToken];
    }
}
