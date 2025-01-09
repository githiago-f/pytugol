import {BoundExpression} from "./bound-expression.ts";
import {BoundNodeKind} from "./bound-node-kind.ts";

export class BoundLiteralExpression extends BoundExpression {
    constructor(public readonly value: any) {
        super();
    }

    override get kind(): BoundNodeKind {
        return BoundNodeKind.LiteralExpression;
    }

    override get type(): string {
        return typeof this.value;
    }
}
