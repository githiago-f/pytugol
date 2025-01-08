import {SyntaxToken} from "./syntax-token.ts";
import {Lexer} from "./lexer.ts";
import {SyntaxKind} from "./syntax-kind.ts";
import {NumberExpressionSyntax} from "./number-expression.syntax.ts";
import {ParenthesizedExpressionSyntax} from "./parenthesized-expression.syntax.ts";
import {ExpressionSyntax} from "./expression.syntax.ts";
import {BinaryExperssionSyntax} from "./binary-experssion.syntax.ts";
import {SyntaxTree} from "./syntax-tree.ts";

export class Parser {
    public diagnostics: string[] = [];
    private _position = 0;
    private readonly _tokens: SyntaxToken[] = [];

    constructor(text: string) {
        const tokens: SyntaxToken[] = [];

        const lexer = new Lexer(text);
        let token;

        do {
            token = lexer.nextToken();

            if(token?.kind === SyntaxKind.WhitespaceToken || token?.kind === SyntaxKind.BadToken) {
                continue;
            }
            tokens.push(token);
        } while(token?.kind !== SyntaxKind.EndOfFileToken)

        this._tokens = tokens;
        this.diagnostics = lexer.diagnostics;
    }

    private peek(offset: number) {
        const index = this._position + offset;
        if(index >= this._tokens.length) {
            return this._tokens[this._tokens.length - 1];
        }
        return this._tokens[index];
    }

    private get current() {
        return this.peek(0);
    }

    private nextToken() {
        const current = this.current;
        this._position++;
        return current;
    }

    private match(kind: SyntaxKind) {
        if(this.current.kind === kind) {
            return this.nextToken();
        }

        this.diagnostics.push(`ERROR: Expected ${SyntaxKind[kind]} but got ${SyntaxKind[this.current.kind]}`);
        return new SyntaxToken(kind, "", null, this.current.position);
    }

    public parse(): SyntaxTree {
        const expression = this.parseTerm();
        const eofToken = this.match(SyntaxKind.EndOfFileToken);
        return new SyntaxTree(this.diagnostics, expression, eofToken);
    }

    private parseExpression(): ExpressionSyntax {
        return this.parseTerm();
    }

    private parseTerm() {
        let left = this.parseFactor();
        while(this.current.kind === SyntaxKind.PlusToken || this.current.kind === SyntaxKind.MinusToken) {
            const operatorToken = this.nextToken();
            const right = this.parseFactor();
            left = new BinaryExperssionSyntax(left, operatorToken, right);
        }
        return left;
    }

    private parseFactor(): ExpressionSyntax {
        let left = this.parsePrimaryExpression();
        while(this.current.kind === SyntaxKind.StarToken || this.current.kind === SyntaxKind.SlashToken) {
            const operatorToken = this.nextToken();
            const right = this.parsePrimaryExpression();
            left = new BinaryExperssionSyntax(left, operatorToken, right);
        }

        return left;
    }

    private parsePrimaryExpression(): ExpressionSyntax {
        if(this.current.kind === SyntaxKind.OpenParenthesisToken) {
            const left = this.nextToken();
            const expression = this.parseExpression();
            const right = this.match(SyntaxKind.CloseParenthesisToken);
            return new ParenthesizedExpressionSyntax(left, expression, right);
        }

        const numberToken = this.match(SyntaxKind.NumberToken);
        return new NumberExpressionSyntax(numberToken);
    }
}
