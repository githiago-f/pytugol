import {SyntaxNode} from "../code-analysis/syntax/syntax-node.ts";
import {SyntaxToken} from "../code-analysis/syntax/syntax-token.ts";

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
