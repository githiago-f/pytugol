import {SyntaxTree} from "../../../src/lang/code-analysis/syntax/syntax-tree";
import {Evaluator} from "../../../src/lang/code-analysis/evaluator";
import {Binder} from "../../../src/lang/code-analysis/binding/binder";

export function parse(text: string): SyntaxTree {
    return SyntaxTree.parse(text);
}

export function bind(text: string) {
    const binder = new Binder();
    const parsed = parse(text);
    const expression = binder.bindExpression(parsed.root);

    binder.diagnostics.push(...parsed.diagnostics);

    return {binder, expression};
}

export function evaluate(text: string): any {
    const { binder, expression } = bind(text);

    for(const diagnostic of binder.diagnostics) {
        console.log(diagnostic);
    }

    return new Evaluator(expression).evaluate();
}
