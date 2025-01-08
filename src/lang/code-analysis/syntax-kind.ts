export enum SyntaxKind {
    // special tokens
    BadToken = 'BadToken',
    EndOfFileToken = 'EndOfFileToken',
    WhitespaceToken = 'WhitespaceToken',
    PlusToken = 'PlusToken',
    MinusToken = 'MinusToken',
    StarToken = 'StarToken',
    SlashToken = 'SlashToken',
    OpenParenthesisToken = 'OpenParenthesisToken',
    CloseParenthesisToken = 'CloseParenthesisToken',

    // literals
    NumberToken = 'NumberToken',

    // expressions
    LiteralExpression = 'LiteralExpression',
    UnaryExpression = 'UnaryExpression',
    BinaryExpression = 'BinaryExpression',
    ParenthesizedExpression = 'ParenthesizedExpression',
}
