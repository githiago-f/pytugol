import {BoundExpression} from "./bound-expression.ts";
import {BoundNodeKind} from "./bound-node-kind.ts";
import {InternalType, LiteralInternalTypes} from "../internal-types.ts";

export class BoundLiteralExpression extends BoundExpression {
    constructor(public readonly value: LiteralInternalTypes) {
        super();
    }

    override get kind(): BoundNodeKind {
        return BoundNodeKind.LiteralExpression;
    }

    override get type(): InternalType {
        return typeof this.value as InternalType;
    }
}
