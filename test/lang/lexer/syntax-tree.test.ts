import {SyntaxTree} from "../../../src/lang/code-analysis/syntax-tree";
import {Evaluator} from "../../../src/lang/code-analysis/evaluator";
import {prettyPrint} from "../../../src/lang/helpers/printer";

describe('SyntaxTree', () => {
    describe('parse', () => {
        it('parse expression syntax tree', () => {
            const simpleSum = SyntaxTree.parse('1 + 2');

            prettyPrint(simpleSum.root);

            expect(simpleSum).toBeDefined();
        });

        it('parse parenthesized expression syntax tree', () => {
            const simpleSum = SyntaxTree.parse('1 + 2 * (2 + 5)');

            prettyPrint(simpleSum.root);

            expect(simpleSum).toBeDefined();
        });
    });

    describe('evaluator', () => {
        it('evaluate expression syntax tree', () => {
            const parseSum = new Evaluator(SyntaxTree.parse('1 + 2').root).evaluate();

            expect(parseSum).toBe(3);
        });

        it('evaluate parenthesized expression syntax tree', () => {
            const simpleSum = new Evaluator(SyntaxTree.parse('(1 + 2) * (2 + 5)').root).evaluate();

            expect(simpleSum).toBe(21);
        });
    });
});
