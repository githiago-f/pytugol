import {SyntaxToken} from "./syntax-token.ts";
import {SyntaxKind} from "./syntax-kind.ts";
import {isANumber, isLetter, isWhitespace} from "../../helpers/checkers.ts";
import {SyntaxFacts} from "./syntax-facts.ts";
import {DiagnosticsRepository} from "../diagnostic.ts";
import {TextSpan} from "../text/text-span.ts";
import {SourceText} from "../text/source-text.ts";

export class Lexer {
    private _position = 0;
    private _start = 0;

    public readonly diagnostics: DiagnosticsRepository;
    private readonly _text: SourceText;

    constructor(text: SourceText) {
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
        return this._text.get(index);
    }

    public lexToken(): SyntaxToken {
        this._start = this._position;

        if(isANumber(this.current)) {
            return this.readNumber();
        }

        if(isWhitespace(this.current)) {
            return this.readWhitespace();
        }

        if(isLetter(this.current)) {
            return this.readIdentifierOrKeyword();
        }

        switch(this.current) {
            case '\0': return new SyntaxToken(SyntaxKind.EndOfFileToken, "\0", null, this._position);
            case '+':  return new SyntaxToken(SyntaxKind.PlusToken, '+', null, this._position++);
            case '-':  return new SyntaxToken(SyntaxKind.MinusToken, '-', null, this._position++);
            case '*':  return new SyntaxToken(SyntaxKind.StarToken, '*', null, this._position++);
            case '/':  return new SyntaxToken(SyntaxKind.SlashToken, '/', null, this._position++);
            case '%':  return new SyntaxToken(SyntaxKind.ModToken, '%', null, this._position++);
            case '(':  return new SyntaxToken(SyntaxKind.OpenParenthesisToken, '(', null, this._position++);
            case ')':  return new SyntaxToken(SyntaxKind.CloseParenthesisToken, ')', null, this._position++);
            case '=':
                if(this.lookahead === '=') {
                    this._position+=2;
                    return new SyntaxToken(SyntaxKind.EqEqToken, '==', null, this._start);
                }
                return new SyntaxToken(SyntaxKind.EqToken, '=', null, this._position++);
            case '!':
                if(this.lookahead === '=') {
                    this._position+=2;
                    return new SyntaxToken(SyntaxKind.NEqToken, '!=', null, this._start);
                }
                break;
            case '<':
                if(this.lookahead === '=') {
                    this._position+=2;
                    return new SyntaxToken(SyntaxKind.LteToken, '<=', null, this._start);
                }
                return new SyntaxToken(SyntaxKind.LtToken, '<', null, this._position++);
            case '>':
                if(this.lookahead === '=') {
                    this._position+=2;
                    return new SyntaxToken(SyntaxKind.GteToken, '>=', null, this._start);
                }
                return new SyntaxToken(SyntaxKind.GtToken, '>', null, this._position++);
        }

        this.diagnostics.reportBadCharacter(this._position, this.current);
        return new SyntaxToken(SyntaxKind.BadToken, this._text.getByRange(this._position-1, 1), null, this._position++);
    }

    private readIdentifierOrKeyword() {
        while (isLetter(this.current)) this.next();

        const text = this._text.getByRange(this._start, this._position);
        const kind = SyntaxFacts.getKeywordKind(text);

        return new SyntaxToken(kind, text, null, this._start);
    }

    private readWhitespace() {
        while (isWhitespace(this.current)) this.next();

        const text = this._text.getByRange(this._start, this._position);

        return new SyntaxToken(SyntaxKind.WhitespaceToken, text, null, this._start);
    }

    private readNumber() {
        while (isANumber(this.current) || this.current === '.') this.next();

        const text = this._text.getByRange(this._start, this._position);

        const num = Number(text);
        if (isNaN(num)) {
            this.diagnostics.reportInvalidNumber(new TextSpan(this._start, length), text);
        }

        return new SyntaxToken(SyntaxKind.NumberToken, text, num, this._start);
    }
}
