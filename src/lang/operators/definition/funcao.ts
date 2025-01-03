import {operations} from "../operations.ts";
import {setAddress} from "../../memory/function-addresses.ts";
import {matchBrackets} from "../../match-brackets.ts";
import {ProgramCounter} from "../../memory/program-counter.ts";

export const functionNamingValidation = '[^\\s\\[\\]{}()\\-\\\'\\";,.]+'

const regex = 'função ('+ functionNamingValidation +')\\(([^]*)\\)\\s?\{';

operations.register(regex, () => {
    const matched = ProgramCounter.instance.currentLine.match(new RegExp(regex));

    if (matched === null) {
        return;
    }

    console.log({ matched });

    setAddress(matched[1], ProgramCounter.instance.current, matched[2].split(/,\s?/g));
    const nextLine = matchBrackets(ProgramCounter.instance.lines, ProgramCounter.instance.current);

    ProgramCounter.instance.goto(nextLine);
});
