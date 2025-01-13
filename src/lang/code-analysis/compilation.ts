import {SyntaxTree} from "./syntax/syntax-tree.ts";
import {Binder} from "./binding/binder.ts";
import {Evaluator} from "./evaluator.ts";
import {prettyPrint} from "../helpers/printer.ts";
import {Diagnostic} from "./diagnostic.ts";
import {VariableSymbol} from "./variable-symbol.ts";

export class EvaluationResult {
    constructor(
        public readonly diagnostics: readonly Diagnostic[],
        public readonly value: any
    ) {}
}

export class Compilation {
    constructor(public readonly syntax: SyntaxTree) {
        console.log("Syntax tree representation ::: \n", prettyPrint(syntax.root));
    }

    public evaluate(variables: Map<VariableSymbol, any>): EvaluationResult {
        const binder = new Binder(variables);

        const expression = binder.bindExpression(this.syntax.root);
        binder.diagnostics.concat(this.syntax.diagnostics);

        if (binder.diagnostics.diagnostics.length > 0)
            return new EvaluationResult(binder.diagnostics.toArray(), null);

        const evaluator = new Evaluator(expression, variables);

        return new EvaluationResult([], evaluator.evaluate());
    }
}
