import {Lexer} from "../../../src/lang/code-analysis/syntax/lexer";
import {SyntaxKind} from "../../../src/lang/code-analysis/syntax/syntax-kind";

describe('Lexer', () => {
   const getLexer = (code: string) => new Lexer(code);

    describe('.lexToken', () => {
        describe('when a symbol is passed', () => {
            const tokens: Record<string, SyntaxKind> = {
                '\0': SyntaxKind.EndOfFileToken,
                '+': SyntaxKind.PlusToken,
                '-': SyntaxKind.MinusToken,
                '*': SyntaxKind.StarToken,
                '/': SyntaxKind.SlashToken,
                '%': SyntaxKind.ModToken,
                '(': SyntaxKind.OpenParenthesisToken,
                ')': SyntaxKind.CloseParenthesisToken,
                '==': SyntaxKind.EqEqToken,
                '=': SyntaxKind.EqToken,
                '!=': SyntaxKind.NEqToken,
                '<': SyntaxKind.LtToken,
                '<=': SyntaxKind.LteToken,
                '>': SyntaxKind.GtToken,
                '>=': SyntaxKind.GteToken,
                ' ': SyntaxKind.WhitespaceToken,
                '\n': SyntaxKind.WhitespaceToken,
                '\r': SyntaxKind.WhitespaceToken,
                '\t': SyntaxKind.WhitespaceToken
            };

            it('should parse math tokens', () => {
                for(const token of Object.keys(tokens)) {
                    const lexed = getLexer(token).lexToken();
                    expect(lexed.kind).toEqual(tokens[token]);
                    expect(lexed.text).toBe(token);
                    expect(lexed.value).toBe(null);
                    expect(lexed.position).toBe(0);
                }
            });
        });

        describe('when a number is passed', () => {
            it('should parse floats and integers as numbers', () => {
                const numToken = getLexer("1.1").lexToken();
                expect(numToken.kind).toEqual(SyntaxKind.NumberToken);
                expect(numToken.text).toBe("1.1");
                expect(numToken.value).toBe(1.1);

                const numToken2 = getLexer("1").lexToken();
                expect(numToken2.kind).toEqual(SyntaxKind.NumberToken);
                expect(numToken2.text).toBe("1");
                expect(numToken2.value).toBe(1);
            });
        });
    });
});
