import {SyntaxTree} from "../../../src/lang/code-analysis/syntax/syntax-tree";
import {Evaluator} from "../../../src/lang/code-analysis/syntax/evaluator";

export function parse(text: string): SyntaxTree {
    return SyntaxTree.parse(text);
}

export function evaluate(text: string): any {
    return new Evaluator(parse(text).root).evaluate();
}
