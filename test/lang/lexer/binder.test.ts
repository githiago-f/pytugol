import {bind} from "../helpers/parse";

describe('Binder', () => {
    describe('bind', () => {
        it('binds the minus operator to a number only', () => {
            const {binder: b1} = bind("-1");
            const {binder: b2} = bind("-verdadeiro");

            expect(b1.diagnostics).toHaveLength(0);
            expect(b2.diagnostics).toHaveLength(1);
            expect(b2.diagnostics[0]).toBe("ERROR: Unary operator - is not defined for boolean");
        });
    });
});
