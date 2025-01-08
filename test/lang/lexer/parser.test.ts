import {SyntaxTree} from "../../../src/lang/code-analysis/syntax-tree";
import {Evaluator} from "../../../src/lang/code-analysis/evaluator";
import {prettyPrint} from "../../../src/lang/helpers/printer";
import {BinaryExperssionSyntax} from "../../../src/lang/code-analysis/binary-experssion.syntax";
import {LiteralExpressionSyntax} from "../../../src/lang/code-analysis/literal-expression.syntax";
import {SyntaxToken} from "../../../src/lang/code-analysis/syntax-token";
import {SyntaxKind} from "../../../src/lang/code-analysis/syntax-kind";
import {UnaryExpressionSyntax} from "../../../src/lang/code-analysis/unary-expression.syntax";

describe('Parser', () => {
    describe('parse', () => {
        it('parses expression syntax tree', () => {
            const simpleSum = SyntaxTree.parse('1 + 2');

            prettyPrint(simpleSum.root);

            expect(simpleSum.diagnostics).toHaveLength(0);
            expect(simpleSum).toBeDefined();
        });

        it('parses parenthesized expression syntax tree', () => {
            const simpleSum = SyntaxTree.parse('1 + 2 * (2 + 5)');

            prettyPrint(simpleSum.root);

            expect(simpleSum).toBeDefined();
            expect(simpleSum.diagnostics).toHaveLength(0);
            expect(new Evaluator(simpleSum.root).evaluate()).toBe(15);
        });

        it('parses minus unary operator', () => {
            const simpleSum = SyntaxTree.parse('1 + -2');

            expect(simpleSum.diagnostics).toHaveLength(0);
            expect(simpleSum).toStrictEqual(
                new SyntaxTree(
                    [],
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
