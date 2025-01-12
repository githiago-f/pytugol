import {SyntaxToken} from "./syntax-token.ts";
import {ExpressionSyntax} from "./expression.syntax.ts";
import {SyntaxKind} from "./syntax-kind.ts";

export class NameExpressionSyntax extends ExpressionSyntax{
    public override readonly kind = SyntaxKind.NameExpression;

    constructor(
        public readonly identifier: SyntaxToken,
    ) {
        super();
    }

    override get children() {
        return [this.identifier];
    }
}

