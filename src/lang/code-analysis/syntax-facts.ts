import {SyntaxKind} from "./syntax-kind.ts";

export class SyntaxFacts {
    public static getUnaryOperatorPrecedence(kind: SyntaxKind): number {
        switch (kind) {
            case SyntaxKind.MinusToken:
            case SyntaxKind.PlusToken:
                return 3;

            default:
                return 0;
        }
    }

    public static getBinaryOperatorPrecedence(kind: SyntaxKind): number {
        switch (kind) {
            case SyntaxKind.StarToken:
            case SyntaxKind.SlashToken:
                return 2;

            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
                return 1;

            default:
                return 0;
        }
    }
}
