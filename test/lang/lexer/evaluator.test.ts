import {evaluate} from "../helpers/parse";

describe('Evaluator', () => {
    describe('.evaluate', () => {
        it('evaluate expression syntax tree', () => {
            expect(evaluate('1 + 2')).toBe(3);
        });

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
    });
});
