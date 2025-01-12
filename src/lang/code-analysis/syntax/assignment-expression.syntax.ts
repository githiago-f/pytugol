import {ExpressionSyntax} from "./expression.syntax.ts";
import {SyntaxKind} from "./syntax-kind.ts";
import {SyntaxToken} from "./syntax-token.ts";

export class AssignmentExpressionSyntax extends ExpressionSyntax {
    public readonly kind = SyntaxKind.AssignmentExpression;

    constructor(
        public readonly identifier: SyntaxToken,
        public readonly equals: SyntaxToken,
        public readonly expression: ExpressionSyntax
    ) {
        super();
    }

    get children() {
        return [this.identifier, this.equals, this.expression];
    }
}
