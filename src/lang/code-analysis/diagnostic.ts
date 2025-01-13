import {TextSpan} from "./text-span.ts";
import {SyntaxKind} from "./syntax/syntax-kind.ts";
import {SyntaxToken} from "./syntax/syntax-token.ts";

export class Diagnostic {
    constructor(
        public readonly span: TextSpan,
        public readonly message: string
    ) {}

    toString() {
        return this.message;
    }

    toJSON() {
        return this.message;
    }
}

export class DiagnosticsRepository {
    private _diagnostics: Diagnostic[] = [];

    private report(span: TextSpan, message: string): void {
        this._diagnostics.push(new Diagnostic(span, message));
    }

    get diagnostics(): readonly Diagnostic[] {
        return this._diagnostics;
    }

    toArray(): readonly Diagnostic[] {
        return this._diagnostics;
    }

    public concat(diagnostics: DiagnosticsRepository) {
        this._diagnostics = this._diagnostics.concat(diagnostics.diagnostics);
    }

    public reportInvalidNumber(span: TextSpan, text: string): void {
        const message = `${text} não é um número válido`;
        this.report(span, message);
    }

    public reportBadCharacter(position: number, char: string) {
        const message = `"ERRO: Caractere desconhecido "${char}"`;
        this.report(new TextSpan(position, 1), message);
    }

    public reportKindMismatch(token: SyntaxToken, expected: SyntaxKind): void {
        const message = `ERRO: ${SyntaxKind[expected]} esperado mas ${SyntaxKind[token.kind]} recebido`;
        this.report(token.span, message);
    }

    public reportUndefinedUnaryOperator(operator: SyntaxToken, invalidType: string): void {
        const message = `ERRO: Operador unário "${operator.text}" não foi definido para ${invalidType}`;
        this.report(operator.span, message);
    }

    public reportUndefinedBinaryOperator(operator: SyntaxToken, leftType: string, rightType: string): void {
        const message = `ERRO: Operador binário "${operator.text}" não foi definido para ${leftType} e nem para ${rightType}`;
        this.report(operator.span, message);
    }

    public reportUndefinedVariable(identifierToken: SyntaxToken) {
        const message = `ERRO: Variavel "${identifierToken.text}" não existe`;
        this.report(identifierToken.span, message);
    }
}
