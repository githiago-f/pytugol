import {Binder} from "../../../src/lang/code-analysis/binding/binder";
import {SyntaxTree} from "../../../src/lang/code-analysis/syntax/syntax-tree";
import {VariableSymbol} from "../../../src/lang/code-analysis/variable-symbol";

describe('Binder', () => {
    const bind = (code: string) => {
        const variables = new Map<VariableSymbol, any>();
        const binder = new Binder(variables);

        const result = binder.bindExpression(SyntaxTree.parse(code).root);

        return { result, diagnostics: binder.diagnostics };
    }

    describe('bind', () => {
        it('binds the minus operator to a number only', () => {
            const expression1 = bind("-1");
            const expression2 = bind("-Verdadeiro");

            expect(expression1.diagnostics.toArray()).toHaveLength(0);
            expect(expression2.diagnostics.toArray()).toHaveLength(1);
            expect(expression2.diagnostics.toArray()[0].message).toBe("ERRO: Operador unário \"-\" não foi definido para boolean");
        });

        it('binds the equality operator to same type operands', () => {
           const expression1 = bind("1 == 1");
           const expression2 = bind("1 == Verdadeiro");

           expect(expression1.diagnostics.toArray()).toHaveLength(0);
           expect(expression2.diagnostics.toArray()).toHaveLength(1);
           expect(expression2.diagnostics.toArray()[0].message).toBe("ERRO: Operador binário \"==\" não foi definido para number e nem para boolean");
        });
    });
});
