import {tokenizer} from "./lang/tokenizer.ts";
import {callStack} from "./lang/memory/call-stack.ts";

const lines = tokenizer(`
// fibonnacci using recursion brute force o(2^n)
função fibonacci(x: numérico) {
    se(x <= 1) retorna 1
    retorna fibonacci(x-1) + fibonacci(x-2)
}

// fibonnacci using dynamic programming o(n)
função fibonacci(x: numérico, dp: lista[numérico]) {
    se(x <= 1) retorna 1
    se(dp[x] != -1) retorna dp[x]
    
    dp[x] = fibonacci(x-1) + fibonacci(x-2)
    
    retorna dp[x]
}

escreva(fibonacci(10))
escreva(fibonacci(10, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
`);

const program = callStack(lines);

program.next();
program.next();
program.next();
program.next();
program.next();
