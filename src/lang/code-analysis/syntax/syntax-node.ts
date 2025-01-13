import {SyntaxKind} from "./syntax-kind.ts";
import {TextSpan} from "../text-span.ts";

export abstract class SyntaxNode {
    public abstract kind: SyntaxKind;
    public abstract children: readonly SyntaxNode[];

    get span(): TextSpan {
        const first = this.children.at(0)!;
        const last = this.children.at(-1)!;

        return new TextSpan(first.span.start, last.span.end);
    }
}
