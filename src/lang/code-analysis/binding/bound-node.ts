import {BoundNodeKind} from "./bound-node-kind.ts";

export abstract class BoundNode {
    public readonly abstract kind: BoundNodeKind
}
