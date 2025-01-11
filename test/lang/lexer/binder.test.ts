import {bind} from "../helpers/parse";

describe('Binder', () => {
    describe('bind', () => {
        it('binds the minus operator to a number only', () => {
            const {binder: b1} = bind("-1");
            const {binder: b2} = bind("-Verdadeiro");

            expect(b1.diagnostics.toArray()).toHaveLength(0);
            expect(b2.diagnostics.toArray()).toHaveLength(1);
            expect(b2.diagnostics.toArray()[0].message).toBe("ERRO: Operador unário - não foi definido para boolean");
        });

        it('binds the equality operator to same type operands', () => {
           const {binder: b1} = bind("1 == 1");
           const {binder: b2} = bind("1 == Verdadeiro");

           expect(b1.diagnostics.toArray()).toHaveLength(0);
           expect(b2.diagnostics.toArray()).toHaveLength(1);
           expect(b2.diagnostics.toArray()[0].message).toBe("ERRO: Operador binário == não foi definido para number e nem para boolean");
        });
    });
});
