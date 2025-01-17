import {SyntaxKind} from "./syntax-kind.ts";
import {InternalType} from "../internal-types.ts";

export const SyntaxKindI18n: Record<SyntaxKind | InternalType, string> = {
    [SyntaxKind.BinaryExpression]: "expressão binária",
    [SyntaxKind.CloseParenthesisToken]: '")" (fecha parentesis)',
    [SyntaxKind.EqEqToken]: '"==" (igual igual, ou "igualdade")',
    [SyntaxKind.FalseKeywordToken]: "",
    [SyntaxKind.GteToken]: "",
    [SyntaxKind.IdentifierToken]: "",
    [SyntaxKind.LiteralExpression]: "",
    [SyntaxKind.LteToken]: "",
    [SyntaxKind.MinusToken]: "",
    [SyntaxKind.ModToken]: "",
    [SyntaxKind.NameExpression]: "",
    [SyntaxKind.NotToken]: "",
    [SyntaxKind.OpenParenthesisToken]: "",
    [SyntaxKind.OrToken]: "",
    [SyntaxKind.ParenthesizedExpression]: "",
    [SyntaxKind.PlusToken]: "",
    [SyntaxKind.SlashToken]: "",
    [SyntaxKind.StarToken]: "",
    [SyntaxKind.TrueKeywordToken]: "",
    [SyntaxKind.UnaryExpression]: "",
    [SyntaxKind.WhitespaceToken]: "",
    [SyntaxKind.EndOfFileToken]: "Fim do script",
    [SyntaxKind.AssignmentExpression]: 'atribuição',
    [SyntaxKind.GtToken]: '">" (maior que)',
    [SyntaxKind.LtToken]: '"<" (menor que)',
    [SyntaxKind.NumberToken]: "número",
    [SyntaxKind.NEqToken]: '"!=" (diferente)',
    [SyntaxKind.EqToken]: '"=" (igual)',
    [SyntaxKind.BadToken]: 'token inválido',
    [SyntaxKind.AndToken]: '"e"',
    'string': "texto",
    'number': "número",
    'null': 'nulo',
    'boolean': 'lógico (verdadeiro ou falso)',
    'object': 'objeto',
    'function': 'função',
}
