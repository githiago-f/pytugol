import {SyntaxToken} from "./syntax-token.ts";
import {SyntaxKind} from "./syntax-kind.ts";
import {isANumber, isLetter, isWhitespace} from "../../helpers/checkers.ts";
import {SyntaxFacts} from "./syntax-facts.ts";

export class Lexer {
    private _position = 0;
    private _line = 1;
    private _column = 0;
    private _diagnostics: string[] = [];
    private readonly _text: string;

    constructor(text: string) {
        this._text = text;
    }

    public get diagnostics() {
        return this._diagnostics;
    }

    private next() {
        this._position++;
        this._column++;
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

        if(isANumber(this.current)) {
            const start = this._position;
            while(isANumber(this.current) || this.current === '.') this.next();

            const text = this._text.substring(start, this._position);

            const num =  Number(text);
            if(isNaN(num)) {
                this._diagnostics.push(`ERROR: ${num} is not a number`);
            }

            return new SyntaxToken(SyntaxKind.NumberToken, text, num, start);
        }

        if(isWhitespace(this.current)) {
            const start = this._position;
            while(isWhitespace(this.current)) this.next();

            const text = this._text.substring(start, this._position);

            return new SyntaxToken(SyntaxKind.WhitespaceToken, text, null, start);
        }

        if(isLetter(this.current)) {
            const start = this._position;
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
                if(this.lookahead === '=')
                    return new SyntaxToken(SyntaxKind.EqEqToken, '==', null, this._position+=2);
                break;
            case '!':
                if(this.lookahead === '=')
                    return new SyntaxToken(SyntaxKind.NEqToken, '!=', null, this._position+=2);
                break;
            case '<':
                if(this.lookahead === '=')
                    return new SyntaxToken(SyntaxKind.LteToken, '<=', null, this._position+=2);
                return new SyntaxToken(SyntaxKind.LtToken, '<', null, this._position+=2);
            case '>':
                if(this.lookahead === '=')
                    return new SyntaxToken(SyntaxKind.GteToken, '>=', null, this._position+=2);
                return new SyntaxToken(SyntaxKind.GtToken, '>', null, this._position+=2);
        }

        this._diagnostics.push("ERROR: Unexpected character: " + this.current + " at line " + this._line + " column " + this._column);
        return new SyntaxToken(SyntaxKind.BadToken, this._text.substring(this._position-1, 1), null, this._position++);
    }
}
