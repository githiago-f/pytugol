import {operations} from "../operators";
import {ProgramCounter} from "./program-counter.ts";
import {MemorySpace} from "./memory-space.ts";

export function* callStack(lines: string[]) {
    ProgramCounter.reset(lines);
    MemorySpace.reset();

    for(; ProgramCounter.instance.isNotFinished; ProgramCounter.instance.next()) {
        operations.apply();

        console.log(ProgramCounter.instance);

        yield;
    }

    console.log("Finished");
}
