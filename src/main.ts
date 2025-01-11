import {Compilation} from "./lang/code-analysis/compilation.ts";
import {SyntaxTree} from "./lang/code-analysis/syntax/syntax-tree.ts";
import {diagnosticsPrintter} from "./lang/helpers/printer.ts";

const input = (document.querySelector("#editor")! as HTMLTextAreaElement);

input.addEventListener('input', (e) => {
    e.preventDefault();
    const syntaxTree = SyntaxTree.parse(input.value!);

    const compilation = new Compilation(syntaxTree);
    const result = compilation.evaluate();

    diagnosticsPrintter(input.value, result.diagnostics);

    document.querySelector("#output")!.innerHTML += `<span>> ${result.value}</span>`;
});
