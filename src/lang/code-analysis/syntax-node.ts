import {SyntaxKind} from "./syntax-kind.ts";

export abstract class SyntaxNode {
    public abstract kind: SyntaxKind;
    public abstract children: SyntaxNode[];
}
