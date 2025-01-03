import {operations} from "../operations.ts";
import {ProgramCounter} from "../../memory/program-counter.ts";

const regex = '}|retorna\\s?([^]?)';

operations.register(regex, () => {
    const matched = ProgramCounter.instance.currentLine.match(new RegExp(regex));

    const isVoid = matched === null || matched[1] === undefined;

    let value: any = isVoid ? undefined : matched[1];

    ProgramCounter.instance.return(value);
});