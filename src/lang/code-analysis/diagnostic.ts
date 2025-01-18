import {TextSpan} from "./text/text-span.ts";
import {SyntaxKind} from "./syntax/syntax-kind.ts";
import {SyntaxToken} from "./syntax/syntax-token.ts";
import {InternalType} from "./internal-types.ts";
import {SyntaxKindI18n} from "./syntax/syntax-kind.i18n.ts";

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

    private t(key: SyntaxKind | InternalType) {
        return SyntaxKindI18n[key];
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
        const message = `ERRO: ${this.t(expected)} esperado mas "${token.text}" recebido`;
        this.report(token.span, message);
    }

    public reportUndefinedUnaryOperator(operator: SyntaxToken, invalidType: InternalType): void {
        const message = `ERRO: Operador unário "${operator.text}" não foi definido para ${this.t(invalidType)}`;
        this.report(operator.span, message);
    }

    public reportUndefinedBinaryOperator(operator: SyntaxToken, leftType: InternalType, rightType: InternalType): void {
        console.log({leftType, rightType});
        const message = `ERRO: Operador binário "${operator.text}" não foi definido para ${this.t(leftType)} e ${this.t(rightType)}`;
        this.report(operator.span, message);
    }

    public reportUndefinedVariable(identifierToken: SyntaxToken) {
        const message = `ERRO: Variavel "${identifierToken.text}" não existe`;
        this.report(identifierToken.span, message);
    }
}
