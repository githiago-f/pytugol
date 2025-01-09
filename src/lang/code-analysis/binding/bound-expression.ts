import {BoundNode} from "./bound-node.ts";

export abstract class BoundExpression extends BoundNode {
    public readonly abstract type: string;
}
