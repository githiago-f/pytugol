export type InternalType = "string" | "number" | "boolean" | "object" | "function";

export type LiteralInternalTypes = string | number | boolean | object | null;

export function bindInternalDefaultValue(type: InternalType) {
    switch (type) {
        case "string":
            return "";
        case "number":
            return 0;
        case "boolean":
            return false;
        default:
            return null;
    }
}
