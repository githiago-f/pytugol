import {SyntaxToken} from "./syntax-token.ts";
import {SyntaxKind} from "./syntax-kind.ts";
import {isANumber, isLetter, isWhitespace} from "../../helpers/checkers.ts";
import {SyntaxFacts} from "./syntax-facts.ts";
import {DiagnosticsRepository} from "../diagnostic.ts";
import {TextSpan} from "../text-span.ts";

export class Lexer {
    private _position = 0;

    public readonly diagnostics: DiagnosticsRepository;
    private readonly _text: string;

    constructor(text: string) {
        this._text = text;
        this.diagnostics = new DiagnosticsRepository();
    }

    private next() {
        this._position++;
    }

    private get current(): string {
        return this.peek(0);
    }
    private get lookahead(): string {
        return this.peek(1);
    }

    private peek(offset = 0) {
        const index = this._position + offset;
        if (index >= this._text.length) {
            return "\0";
        }
        return this._text[index];
    }

    public nextToken(): SyntaxToken {
        if(this._position >= this._text.length) {
            return new SyntaxToken(SyntaxKind.EndOfFileToken, "\0", null, this._position);
        }

        const start = this._position;

        if(isANumber(this.current)) {
            while(isANumber(this.current) || this.current === '.') this.next();

            const text = this._text.substring(start, this._position);

            const num =  Number(text);
            if(isNaN(num)) {
                this.diagnostics.reportInvalidNumber(new TextSpan(start, length), text);
            }

            return new SyntaxToken(SyntaxKind.NumberToken, text, num, start);
        }

        if(isWhitespace(this.current)) {
            while(isWhitespace(this.current)) this.next();

            const text = this._text.substring(start, this._position);

            return new SyntaxToken(SyntaxKind.WhitespaceToken, text, null, start);
        }

        if(isLetter(this.current)) {
            while(isLetter(this.current)) this.next();

            const text = this._text.substring(start, this._position);
            const kind = SyntaxFacts.getKeywordKind(text);

            return new SyntaxToken(kind, text, null, start);
        }

        switch(this.current) {
            case '+': return new SyntaxToken(SyntaxKind.PlusToken, '+', null, this._position++);
            case '-': return new SyntaxToken(SyntaxKind.MinusToken, '-', null, this._position++);
            case '*': return new SyntaxToken(SyntaxKind.StarToken, '*', null, this._position++);
            case '/': return new SyntaxToken(SyntaxKind.SlashToken, '/', null, this._position++);
            case '(': return new SyntaxToken(SyntaxKind.OpenParenthesisToken, '(', null, this._position++);
            case ')': return new SyntaxToken(SyntaxKind.CloseParenthesisToken, ')', null, this._position++);
            case '=':
                if(this.lookahead === '=') {
                    this._position+=2;
                    return new SyntaxToken(SyntaxKind.EqEqToken, '==', null, start);
                }
                return new SyntaxToken(SyntaxKind.EqToken, '=', null, this._position++);
            case '!':
                if(this.lookahead === '=') {
                    this._position+=2;
                    return new SyntaxToken(SyntaxKind.NEqToken, '!=', null, start);
                }
                break;
            case '<':
                if(this.lookahead === '=') {
                    this._position+=2;
                    return new SyntaxToken(SyntaxKind.LteToken, '<=', null, start);
                }
                return new SyntaxToken(SyntaxKind.LtToken, '<', null, this._position++);
            case '>':
                if(this.lookahead === '=') {
                    this._position+=2;
                    return new SyntaxToken(SyntaxKind.GteToken, '>=', null, start);
                }
                return new SyntaxToken(SyntaxKind.GtToken, '>', null, this._position++);
        }

        this.diagnostics.reportBadCharacter(this._position, this.current);
        return new SyntaxToken(SyntaxKind.BadToken, this._text.substring(this._position-1, 1), null, this._position++);
    }
}
