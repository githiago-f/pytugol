import {bind} from "../helpers/parse";

describe('Binder', () => {
    describe('bind', () => {
        it('binds the minus operator to a number only', () => {
            const {binder: b1} = bind("-1");
            const {binder: b2} = bind("-Verdadeiro");

            expect(b1.diagnostics).toHaveLength(0);
            expect(b2.diagnostics).toHaveLength(1);
            expect(b2.diagnostics).toContain("ERROR: Unary operator - is not defined for boolean");
        });

        it('binds the equality operator to same type operands', () => {
           const {binder: b1} = bind("1 == 1");
           const {binder: b2} = bind("1 == Verdadeiro");

           expect(b1.diagnostics).toHaveLength(0);
           expect(b2.diagnostics).toHaveLength(1);
           expect(b2.diagnostics).toContain("ERROR: Binary operator == is not defined for number and boolean");
        });
    });
});
