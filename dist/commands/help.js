import { Command } from "./command.js";
export class HelpCommand extends Command {
    constructor(command, ...args) {
        if (typeof command === "undefined") {
            super("help");
            return;
        }
        if (typeof command === "number") {
            super("help", command.toString());
            return;
        }
        super("help", command, ...args);
    }
    validate() { }
    ;
}
export function help(command, ...args) {
    if (typeof command === "undefined") {
        return new HelpCommand();
    }
    if (typeof command === "number") {
        return new HelpCommand(command);
    }
    return new HelpCommand(command, ...args);
}
//# sourceMappingURL=help.js.map