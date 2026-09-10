import { Command } from "./command.ts";
export declare class HelpCommand extends Command {
    constructor();
    constructor(command: ValidParam2, ...args: ValidParam2[]);
    constructor(page: number);
    validate(): void;
}
export declare function help(): HelpCommand;
export declare function help(command: ValidParam2, ...args: ValidParam2[]): HelpCommand;
export declare function help(page: number): HelpCommand;
//# sourceMappingURL=help.d.ts.map