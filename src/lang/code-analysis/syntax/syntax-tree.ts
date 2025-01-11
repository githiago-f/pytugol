import {ExpressionSyntax} from "./expression.syntax.ts";
import {SyntaxToken} from "./syntax-token.ts";
import {Parser} from "./parser.ts";
import {DiagnosticsRepository} from "../diagnostic.ts";

export class SyntaxTree {
    constructor(
        public readonly diagnostics: DiagnosticsRepository,
        public readonly root: ExpressionSyntax,
        public readonly eof: SyntaxToken,
    ) {}

    static parse(text: string): SyntaxTree {
        return new Parser(text).parse();
    }
}
