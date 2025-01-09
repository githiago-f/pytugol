import {SyntaxToken} from "./syntax/syntax-token.ts";
import {Lexer} from "./lexer.ts";
import {SyntaxKind} from "./syntax/syntax-kind.ts";
import {LiteralExpressionSyntax} from "./expression/literal-expression.syntax.ts";
import {ParenthesizedExpressionSyntax} from "./expression/parenthesized-expression.syntax.ts";
import {ExpressionSyntax} from "./expression/expression.syntax.ts";
import {BinaryExperssionSyntax} from "./expression/binary-experssion.syntax.ts";
import {SyntaxTree} from "./syntax/syntax-tree.ts";
import {SyntaxFacts} from "./syntax/syntax-facts.ts";
import {UnaryExpressionSyntax} from "./expression/unary-expression.syntax.ts";

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

    private matchToken(kind: SyntaxKind) {
        if(this.current.kind === kind) {
            return this.nextToken();
        }

        this.diagnostics.push(`ERROR: Expected ${SyntaxKind[kind]} but got ${SyntaxKind[this.current.kind]}`);
        return new SyntaxToken(kind, "", null, this.current.position);
    }

    public parse(): SyntaxTree {
        const expression = this.parseExpression();
        const eofToken = this.matchToken(SyntaxKind.EndOfFileToken);
        return new SyntaxTree(this.diagnostics, expression, eofToken);
    }

    private parseExpression(parentPrecedence = 0) {
        let left: ExpressionSyntax;
        const unaryOperatorPrecedence = SyntaxFacts.getUnaryOperatorPrecedence(this.current.kind);

        if(unaryOperatorPrecedence != 0 && unaryOperatorPrecedence >= parentPrecedence) {
            const operatorToken = this.nextToken();
            const operand = this.parseExpression(unaryOperatorPrecedence);
            left = new UnaryExpressionSyntax(operatorToken, operand);
        } else {
            left = this.parsePrimaryExpression();
        }

        while(true) {
            const precedence = SyntaxFacts.getBinaryOperatorPrecedence(this.current.kind);

            if(precedence === 0 || precedence <= parentPrecedence) {
                break;
            }

            const operatorToken = this.nextToken();
            const right = this.parseExpression(precedence);
            left = new BinaryExperssionSyntax(left, operatorToken, right);
        }

        return left;
    }

    private parsePrimaryExpression(): ExpressionSyntax {
        if(this.current.kind === SyntaxKind.OpenParenthesisToken) {
            const left = this.nextToken();
            const expression = this.parseExpression();
            const right = this.matchToken(SyntaxKind.CloseParenthesisToken);
            return new ParenthesizedExpressionSyntax(left, expression, right);
        }

        const numberToken = this.matchToken(SyntaxKind.NumberToken);
        return new LiteralExpressionSyntax(numberToken);
    }
}
