export enum Types {
    NUMERICO = 'numérico',
    TEXTO = 'texto',
    LOGICO = 'lógico',
    LISTA = 'lista',
    NADA  = 'nada',
}

export function whichType(value: string): Types {
    if(value === 'verdadeiro' || value === 'falso') {
        return Types.LOGICO;
    }
    if(!isNaN(Number(value))) {
        return Types.NUMERICO;
    }
    if(value.startsWith('"') && value.endsWith('"')) {
        return Types.TEXTO;
    }
    if(value.startsWith('[') && value.endsWith(']')) {
        return Types.LISTA;
    }
    return Types.NADA;
}
