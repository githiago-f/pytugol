export enum SyntaxKind {
    // special tokens
    BadToken = 'BadToken',
    EndOfFileToken = 'EndOfFileToken',
    WhitespaceToken = 'WhitespaceToken',
    PlusToken = 'PlusToken',
    MinusToken = 'MinusToken',
    NotToken = 'NotToken',
    OrToken = 'OrToken',
    AndToken = 'AndToken',
    StarToken = 'StarToken',
    SlashToken = 'SlashToken',
    OpenParenthesisToken = 'OpenParenthesisToken',
    CloseParenthesisToken = 'CloseParenthesisToken',

    // literals
    NumberToken = 'NumberToken',

    // keywords
    FalseKeywordToken = 'FalseKeywordToken',
    TrueKeywordToken = 'TrueKeywordToken',
    IdentifierToken = 'IdentifierToken',

    // expressions
    LiteralExpression = 'LiteralExpression',
    UnaryExpression = 'UnaryExpression',
    BinaryExpression = 'BinaryExpression',
    ParenthesizedExpression = 'ParenthesizedExpression',
}
