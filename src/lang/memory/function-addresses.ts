const functionAddresses: Record<string, {
    address: number,
    args: string[],
    name: string,
}[]> = {};

function hash(functionDefinition: string, args: string[]) {
    return (functionDefinition + args.join(','));
}

export function getAddress(name: string, args: string[]) {
    return functionAddresses[hash(name, args)];
}

export function setAddress(functionDefinition: string, address: number, args: string[]) {
    const hashedName = hash(functionDefinition, args);
    functionAddresses[hashedName] = functionAddresses[hashedName] ?? [];
    functionAddresses[hashedName].push({ address, args, name: functionDefinition });
    console.log(functionAddresses);
}
