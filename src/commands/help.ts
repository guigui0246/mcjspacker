import { Command } from "./command.js";

export class HelpCommand extends Command {
    public constructor();

    public constructor(command: ValidParam2, ...args: ValidParam2[]);

    public constructor(page: number);

    public constructor(
        command?: ValidParam2 | number,
        ...args: ValidParam2[]
    ) {
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

    public validate(): void {};
}

export function help(): HelpCommand;
export function help(command: ValidParam2, ...args: ValidParam2[]): HelpCommand;
export function help(page: number): HelpCommand;

export function help(command?: ValidParam2 | number, ...args: ValidParam2[]): HelpCommand {
    if (typeof command === "undefined") {
        return new HelpCommand();
    }
    if (typeof command === "number") {
        return new HelpCommand(command);
    }
    return new HelpCommand(command, ...args);
}
