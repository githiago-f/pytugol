import {operations} from "../operations.ts";
import {ProgramCounter} from "../../memory/program-counter.ts";

const regex = '[^\\s\\[\\]{}()\\-\';,.]+\\(([^]*)\\)'

operations.register(regex, () => {
    console.log('call to ' + ProgramCounter.instance.currentLine);
});
