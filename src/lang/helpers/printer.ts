import {SyntaxNode} from "../code-analysis/syntax-node.ts";
import {SyntaxToken} from "../code-analysis/syntax-token.ts";

export function prettyPrint(node: SyntaxNode, indent = "", isLast = true)
{
    const marker = isLast ? "└──" : "├──";

    let line = indent;
    line += marker;
    line += node.kind;

    if (node instanceof SyntaxToken && node.value != null)
    {
        line += " ";
        line += node.value;
    }

    console.log(line + "\n");

    indent += isLast ? "    " : "│   ";

    const lastChild = node.children[node.children.length-1];

    for(const child of node.children)
        prettyPrint(child, indent, child == lastChild);
}
