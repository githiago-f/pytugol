import {SyntaxKind} from "./syntax-kind.ts";

export class SyntaxFacts {
    public static getUnaryOperatorPrecedence(kind: SyntaxKind): number {
        switch (kind) {
            case SyntaxKind.MinusToken:
            case SyntaxKind.PlusToken:
            case SyntaxKind.NotToken:
                return 6;

            default:
                return 0;
        }
    }

    public static getBinaryOperatorPrecedence(kind: SyntaxKind): number {
        switch (kind) {
            case SyntaxKind.StarToken:
            case SyntaxKind.SlashToken:
                return 5;

            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
                return 4;

            case SyntaxKind.EqEqToken:
            case SyntaxKind.NEqToken:
            case SyntaxKind.LteToken:
            case SyntaxKind.LtToken:
            case SyntaxKind.GteToken:
            case SyntaxKind.GtToken:
                return 3;

            case SyntaxKind.OrToken:
                return 2;

            case SyntaxKind.AndToken:
                return 1;

            default:
                return 0;
        }
    }

    static getKeywordKind(text: string) {
        switch (text) {
            case 'Verdadeiro':
                return SyntaxKind.TrueKeywordToken;
            case 'Falso':
                return SyntaxKind.FalseKeywordToken;
            case 'nao':
                return SyntaxKind.NotToken;
            case 'e':
                return SyntaxKind.AndToken;
            case 'ou':
                return SyntaxKind.OrToken;
            default:
                return SyntaxKind.IdentifierToken;
        }
    }
}
