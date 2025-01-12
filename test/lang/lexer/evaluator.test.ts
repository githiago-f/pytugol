import {SyntaxTree} from "../../../src/lang/code-analysis/syntax/syntax-tree";
import {Compilation} from "../../../src/lang/code-analysis/compilation";
import {VariableSymbol} from "../../../src/lang/code-analysis/variable-symbol";

describe('Evaluator', () => {
    let evaluate = (code: string, variables = new Map<VariableSymbol, any>()) => {
        const syntaxTree = SyntaxTree.parse(code);

        const compilation = new Compilation(syntaxTree);
        const result = compilation.evaluate(variables);
        return result.value;
    };

    describe('.evaluate', () => {
        it('evaluate expression syntax tree', () => {
            expect(evaluate('1 + 2')).toBe(3);
        });

        // TODO: FIX
        it('evaluate parenthesized expression syntax tree', () => {
            expect(evaluate('(1 + 2) * (2 + 5)')).toBe(21);
        });

        it('evaluate minus unary operator expression', () => {
            expect(evaluate('1 + -2')).toBe(-1);
        });

        it('evaluate correctly unary operator expression', () => {
            expect(evaluate('--1')).toBe(1);
            expect(evaluate('+--+2')).toBe(2);
            expect(evaluate('-1')).toBe(-1);
        });

        it('evaluate true and false', () => {
            expect(evaluate('Verdadeiro')).toBe(true);
            expect(evaluate('Falso')).toBe(false);
        });

        it('evaluate equality and difference operators', () => {
            expect(evaluate('1 == 1')).toBe(true);
            expect(evaluate('1 != 2')).toBe(true);
            expect(evaluate('3 == 3')).toBe(true);
            expect(evaluate('3 != 3')).toBe(false);
        });

        it('evaluate comparators', () => {
            expect(evaluate('1 + 2 >= 3')).toBe(true);
            expect(evaluate('1 > 1')).toBe(false);
            expect(evaluate('1 <= 2 - 1')).toBe(true);
            expect(evaluate('1 < 1')).toBe(false);
        });

        it('evaluate "ou" and "e" expressions', () => {
            expect(evaluate('Verdadeiro ou Falso')).toBe(true);
            expect(evaluate('Falso ou Verdadeiro')).toBe(true);
            expect(evaluate('Falso ou Falso')).toBe(false);
            expect(evaluate('1 == 1 e 1 == 3')).toBe(false);
            expect(evaluate('1 == 1 e Falso')).toBe(false);
        });

        it('evaluate assignment operators', () => {
            const variables = new Map<VariableSymbol, any>();
            expect(evaluate('a = 10', variables)).toBe(10);
            expect(evaluate('a', variables)).toBe(10);

            expect(evaluate('a == 3', new Map([[new VariableSymbol("a", "number"), 3]]))).toBe(true);

            expect(evaluate('a == 3', new Map([[new VariableSymbol("a", "boolean"), true]]))).toBe(null);
        });
    });
});
