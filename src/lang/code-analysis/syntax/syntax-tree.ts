import {ExpressionSyntax} from "../expression/expression.syntax.ts";
import {SyntaxToken} from "./syntax-token.ts";
import {Parser} from "../parser.ts";

export class SyntaxTree {
    constructor(
        public readonly diagnostics: string[],
        public readonly root: ExpressionSyntax,
        public readonly eof: SyntaxToken,
    ) {}

    static parse(text: string): SyntaxTree {
        return new Parser(text).parse();
    }
}
