import {BoundNode} from "./bound-node.ts";
import {InternalType} from "../internal-types.ts";

export abstract class BoundExpression extends BoundNode {
    public readonly abstract type: InternalType;
}
