import {SyntaxTree} from "./lang/code-analysis/syntax/syntax-tree.ts";
import {prettyPrint} from "./lang/helpers/printer.ts";
import {Evaluator} from "./lang/code-analysis/evaluator.ts";
import {Binder} from "./lang/code-analysis/binding/binder.ts";

const syntaxTree = SyntaxTree.parse('(512 + 2.4) * 3');

prettyPrint(syntaxTree.root);

const binder = new Binder();
const expression = binder.bindExpression(syntaxTree.root);

const diagnostics = syntaxTree.diagnostics.concat(binder.diagnostics);

console.log(new Evaluator(expression).evaluate());
console.log(diagnostics);
