import {evaluate} from "../helpers/parse";

describe('Evaluator', () => {
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
            expect(evaluate('verdadeiro')).toBe(true);
            expect(evaluate('falso')).toBe(false);
        });

        it('evaluate or expressions', () => {
            expect(evaluate('verdadeiro ou falso')).toBe(true);
            expect(evaluate('falso ou verdadeiro')).toBe(true);
            expect(evaluate('falso ou falso')).toBe(false);
        });

        it('evaluate and expressions', () => {
            expect(evaluate('falso e falso')).toBe(false);
            expect(evaluate('verdadeiro e falso')).toBe(false);
            expect(evaluate('verdadeiro e verdadeiro')).toBe(true);
        });
    });
});
