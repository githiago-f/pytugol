import {SyntaxTree} from "./lang/code-analysis/syntax/syntax-tree.ts";
import {prettyPrint} from "./lang/helpers/printer.ts";
import {Evaluator} from "./lang/code-analysis/syntax/evaluator.ts";

const code = SyntaxTree.parse('(512 + 2.4) * 3');

prettyPrint(code.root);
console.log(new Evaluator(code.root).evaluate());
