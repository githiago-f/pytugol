import {ProgramCounter} from "../memory/program-counter.ts";

type Predicate = () => void;

export const operations = {
    operators: {} as Record<string, Predicate>,

    register(index: string, predicate: Predicate) {
        this.operators[index] = predicate;
    },

    apply() {
        const keys = Object.keys(this.operators);
        for(const key of keys) {
            const regex = new RegExp(key, 'gi');
            const test = regex.test(ProgramCounter.instance.currentLine)
            console.log(regex, test);

            if(test) {
                this.operators[key]();
                return;
            }
        }
    }
};
