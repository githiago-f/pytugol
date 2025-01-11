import {SyntaxTree} from "../../../src/lang/code-analysis/syntax/syntax-tree";
import {prettyPrint} from "../../../src/lang/helpers/printer";
import {BinaryExperssionSyntax} from "../../../src/lang/code-analysis/syntax/binary-experssion.syntax";
import {LiteralExpressionSyntax} from "../../../src/lang/code-analysis/syntax/literal-expression.syntax";
import {SyntaxToken} from "../../../src/lang/code-analysis/syntax/syntax-token";
import {SyntaxKind} from "../../../src/lang/code-analysis/syntax/syntax-kind";
import {UnaryExpressionSyntax} from "../../../src/lang/code-analysis/syntax/unary-expression.syntax";
import {parse} from "../helpers/parse";
import {DiagnosticsRepository} from "../../../src/lang/code-analysis/diagnostic";

describe('Parser', () => {
    describe('parse', () => {
        it('parses expression syntax tree', () => {
            const simpleSum = SyntaxTree.parse('1 + 2');

            prettyPrint(simpleSum.root);

            expect(simpleSum.diagnostics.toArray()).toHaveLength(0);
            expect(simpleSum).toBeDefined();
        });

        it('parses parenthesized expression syntax tree', () => {
            const simpleSum = parse('1 + 2 * (2 + 5)');

            prettyPrint(simpleSum.root);

            expect(simpleSum).toBeDefined();
            expect(simpleSum.diagnostics.toArray()).toHaveLength(0);
        });

        it('parses minus unary operator', () => {
            const simpleSum = SyntaxTree.parse('1 + -2');

            expect(simpleSum.diagnostics.toArray()).toHaveLength(0);
            expect(simpleSum).toStrictEqual(
                new SyntaxTree(
                    new DiagnosticsRepository(),
                    new BinaryExperssionSyntax(
                        new LiteralExpressionSyntax(new SyntaxToken(SyntaxKind.NumberToken, "1", 1, 0)),
                        new SyntaxToken(SyntaxKind.PlusToken, "+", null, 2),
                        new UnaryExpressionSyntax(
                            new SyntaxToken(SyntaxKind.MinusToken, "-", null, 4),
                            new LiteralExpressionSyntax(new SyntaxToken(SyntaxKind.NumberToken, "2", 2, 5)),
                        )
                    ),
                    new SyntaxToken(SyntaxKind.EndOfFileToken, "\0", null, 6)
                )
            );
        });
    });
});
