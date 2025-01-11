import {SyntaxTree} from "../../../src/lang/code-analysis/syntax/syntax-tree";
import {Evaluator} from "../../../src/lang/code-analysis/evaluator";
import {Binder} from "../../../src/lang/code-analysis/binding/binder";
import {prettyPrint} from "../../../src/lang/helpers/printer";

export function parse(text: string): SyntaxTree {
    const tree = SyntaxTree.parse(text);
    console.log(prettyPrint(tree.root));
    return tree;
}

export function bind(text: string) {
    const binder = new Binder();
    const parsed = parse(text);
    const expression = binder.bindExpression(parsed.root);

    binder.diagnostics.concat(parsed.diagnostics);

    return {binder, expression};
}

export function evaluate(text: string): any {
    const { expression } = bind(text);

    return new Evaluator(expression).evaluate();
}
