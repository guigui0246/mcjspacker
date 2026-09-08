

export abstract class Command<T extends string[]> {
    public command: CommandType;
    public args: T | null;

    public constructor(
        command: CommandType,
        ...args: T
    );

    public constructor(
        command: FullCommand
    );

    public constructor(
        command: CommandType | FullCommand,
        ...args: T
    ) {
        if (args.length === 0) {
            let fullargs = command.split(" ") as [CommandType, ...T];
            let newcommand: CommandType, newargs: T;
            [newcommand, ...newargs] = fullargs;
            this.command = newcommand;
            this.args = newargs.length ? newargs : null;
        } else {
            if (command.includes(" ")) {
                throw new Error(
                    "Command cannot contain arguments in both the command and the args. Please separate them."
                );
            }
            this.command = command;
            this.args = args;
        }
        if (this.validate) {
            this.validate();
        }
    }

    public abstract validate(): void;
}

export class CustomCommand extends Command<string[]> {
    validate(): void {};
}
