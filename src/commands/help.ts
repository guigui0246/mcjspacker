import { Command } from "./command.ts";

export class HelpCommand<JavaSpecific extends boolean = false, BedrockSpecific extends boolean = false> extends Command<JavaSpecific, BedrockSpecific> {
    public constructor();

    public constructor(command: ValidParam2, ...args: ValidParam2[]);

    public constructor(page: BedrockSpecific extends true ? number : never);

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

export function help<
    JavaSpecific extends boolean = false,
    BedrockSpecific extends boolean = false
>(): HelpCommand<JavaSpecific, BedrockSpecific>;
export function help<
    JavaSpecific extends boolean = false,
    BedrockSpecific extends boolean = false
>(command: ValidParam2, ...args: ValidParam2[]): HelpCommand<JavaSpecific, BedrockSpecific>;
export function help<
    JavaSpecific extends boolean = false,
    BedrockSpecific extends boolean = false
>(page: BedrockSpecific extends true ? number : never): HelpCommand<JavaSpecific, BedrockSpecific>;

export function help<
    JavaSpecific extends boolean = false,
    BedrockSpecific extends boolean = false
>(command?: ValidParam2 | (BedrockSpecific extends true ? number : never), ...args: ValidParam2[]): HelpCommand<JavaSpecific, BedrockSpecific> {
    if (typeof command === "undefined") {
        return new HelpCommand<JavaSpecific, BedrockSpecific>();
    }
    if (typeof command === "number") {
        return new HelpCommand<JavaSpecific, BedrockSpecific>(command);
    }
    return new HelpCommand<JavaSpecific, BedrockSpecific>(command, ...args);
}
