import {ExpressionSyntax} from "./expression.syntax.ts";
import {SyntaxToken} from "./syntax-token.ts";
import {Parser} from "./parser.ts";
import {DiagnosticsRepository} from "../diagnostic.ts";
import {SourceText} from "../text/source-text.ts";
import {Lexer} from "./lexer.ts";
import {SyntaxKind} from "./syntax-kind.ts";

export class SyntaxTree {
    constructor(
        public readonly text: SourceText,
        public readonly diagnostics: DiagnosticsRepository,
        public readonly root: ExpressionSyntax,
        public readonly eof: SyntaxToken,
    ) {}

    static parse(text: string): SyntaxTree {
        return this.parseFromSrc(SourceText.from(text));
    }

    static parseFromSrc(text: SourceText): SyntaxTree {
        return new Parser(text).parse();
    }

    static getTokens(text: string) {
        return this.parseTokens(SourceText.from(text)).toArray();
    }

    static *parseTokens(text: SourceText) {
        const lexer = new Lexer(text);
        while(true) {
            const token = lexer.lexToken();
            if(token.kind === SyntaxKind.EndOfFileToken) {
                break;
            }
            yield token;
        }
    }
}
