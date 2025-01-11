import {SyntaxKind} from "./syntax-kind.ts";
import {SyntaxNode} from "./syntax-node.ts";
import {TextSpan} from "../text-span.ts";

export class SyntaxToken extends SyntaxNode {
    constructor(
        public kind: SyntaxKind,
        public text: string,
        public value: any,
        public position: number,
    ) {
        super();
    }

    get children(): SyntaxNode[] {
        return [];
    }

    get span(): TextSpan {
        return new TextSpan(this.position, this.text.length);
    }
}
