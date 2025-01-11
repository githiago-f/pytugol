import {SyntaxNode} from "../code-analysis/syntax/syntax-node.ts";
import {SyntaxToken} from "../code-analysis/syntax/syntax-token.ts";
import {Diagnostic} from "../code-analysis/diagnostic.ts";

export function prettyPrint(node: SyntaxNode, indent = "", isLast = true) {
    const marker = isLast ? "└──" : "├──";

    let line = indent;
    line += marker;
    line += node.kind;

    if (node instanceof SyntaxToken && node.value != null)
    {
        line += " ";
        line += node.value;
    }

    indent += isLast ? "    " : "│   ";

    const lastChild = node.children[node.children.length-1];

    line += '\n';

    for(const child of node.children)
        line += prettyPrint(child, indent, child == lastChild);

    return line;
}

export function diagnosticsPrintter(text: string, diagnostics: Diagnostic[]) {
    let line = '';

    console.log(diagnostics);

    for (const diagnostic of diagnostics) {
        line += `<span style="color: red;">${diagnostic.toString()}</span><br/>`;
        line += `<span style="color: inherit;">${text.substring(0, diagnostic.span.start)}</span>`;
        line += `<span style="color: red;">${text.substring(diagnostic.span.start, diagnostic.span.end)}</span>`;
        line += `<span style="color: inherit;">${text.substring(diagnostic.span.end)}</span><br/>`;
    }

    document.querySelector('#output')!.innerHTML = line;
}
