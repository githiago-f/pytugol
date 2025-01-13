export enum SyntaxKind {
    // special tokens
    BadToken = 'BadToken',
    EndOfFileToken = 'EndOfFileToken',
    WhitespaceToken = 'WhitespaceToken',
    PlusToken = 'PlusToken',
    MinusToken = 'MinusToken',
    ModToken = 'ModToken',
    StarToken = 'StarToken',
    SlashToken = 'SlashToken',
    NotToken = 'NotToken',
    OrToken = 'OrToken',
    AndToken = 'AndToken',
    OpenParenthesisToken = 'OpenParenthesisToken',
    CloseParenthesisToken = 'CloseParenthesisToken',

    EqEqToken = 'EqEqToken',
    NEqToken = 'NEqToken',
    GtToken = 'GtToken',
    GteToken = 'GteToken',
    LtToken = 'LtToken',
    LteToken = 'LteToken',

    EqToken = 'EqToken',

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
    NameExpression = 'NameExpression',
    AssignmentExpression = 'AssignmentExpression',
}
