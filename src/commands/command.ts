

export abstract class Command implements CommandProto {
    private command: CommandType;
    private args: ValidParam2[] | null;

    public constructor(
        command: CommandType,
        ...args: ValidParam2[]
    );

    public constructor(
        command: FullCommand
    );

    public constructor(
        command: CommandType | FullCommand,
        ...args: ValidParam2[]
    ) {
        if (args.length === 0) {
            let fullargs = command.split(" ") as [CommandType, ...ValidParam2[]];
            let newcommand: CommandType, newargs: ValidParam2[];
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

    public toTemplate(): [ValidParam1, ValidParam2[]] {
        let commandString = this.command;
        if (!this.args) {
            return [commandString, []];
        }
        if (this.args.every(arg => typeof arg === "string")) {
            commandString += " " + this.args.join(" ");
            return [commandString, []];
        }
        let commandTemplate: string[] = [commandString];
        let args: ValidParam2[] = [];

        for (const arg of this.args) {
            if (typeof arg === "string") {
                commandTemplate[commandTemplate.length - 1] += " " + arg;
            } else {
                commandTemplate[commandTemplate.length - 1] += " ";
                args.push(arg);
                commandTemplate.push("");
            }
        }

        const template = Object.assign(commandTemplate, {
            raw: commandTemplate,
        }) as unknown as TemplateStringsArray;
        return [template, args];
    }
}

export class CustomCommand extends Command {
    validate(): void {};
}
