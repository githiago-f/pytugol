import {SyntaxNode} from "../code-analysis/syntax/syntax-node.ts";
import {SyntaxToken} from "../code-analysis/syntax/syntax-token.ts";
import {Diagnostic} from "../code-analysis/diagnostic.ts";
import {SourceText} from "../code-analysis/text/source-text.ts";
import {TextSpan} from "../code-analysis/text/text-span.ts";

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

export function diagnosticsPrinter(text: SourceText, diagnostics: readonly Diagnostic[]) {
    let htmlLine = '';

    for (const diagnostic of diagnostics) {
        const lineIndex = text.getLineIndex(diagnostic.span.start);

        const line = text.lines[lineIndex];
        const column = diagnostic.span.start - (line?.start??0) + 1;

        const prefixSpan = new TextSpan(line?.start ?? 0, diagnostic.span.start);
        const suffixSpan = new TextSpan(diagnostic.span.end, line?.end ?? 0);

        htmlLine += `<span style="color: red;">${diagnostic.toString()}</span><br/>`;
        htmlLine += `<span style="color: red;"> na linha ${lineIndex + 1}, coluna ${column}: </span>`;
        htmlLine += `<span style="color: inherit;">${text.getBySpan(prefixSpan)}</span>`;
        htmlLine += `<span style="color: red;">${text.getBySpan(diagnostic.span)}</span>`;
        htmlLine += `<span style="color: inherit;">${text.getBySpan(suffixSpan)}</span><br/>`;
    }

    document.querySelector('#output')!.innerHTML = htmlLine;
}
