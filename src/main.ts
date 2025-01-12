import {Compilation} from "./lang/code-analysis/compilation.ts";
import {SyntaxTree} from "./lang/code-analysis/syntax/syntax-tree.ts";
import {diagnosticsPrintter} from "./lang/helpers/printer.ts";
import {VariableSymbol} from "./lang/code-analysis/variable-symbol.ts";

const input = (document.querySelector("#editor")! as HTMLTextAreaElement);
const variables = new Map<VariableSymbol, any>();

input.addEventListener('input', (e) => {
    e.preventDefault();
    const syntaxTree = SyntaxTree.parse(input.value!);

    const compilation = new Compilation(syntaxTree);
    const result = compilation.evaluate(variables);

    diagnosticsPrintter(input.value, result.diagnostics);

    document.querySelector("#output")!.innerHTML += `<span>> ${result.value}</span>`;
});
