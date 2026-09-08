export class Command {
    command;
    args;
    constructor(command, ...args) {
        if (args.length === 0) {
            let fullargs = command.split(" ");
            let newcommand, newargs;
            [newcommand, ...newargs] = fullargs;
            this.command = newcommand;
            this.args = newargs.length ? newargs : null;
        }
        else {
            if (command.includes(" ")) {
                throw new Error("Command cannot contain arguments in both the command and the args. Please separate them.");
            }
            this.command = command;
            this.args = args;
        }
        if (this.validate) {
            this.validate();
        }
    }
}
export class CustomCommand extends Command {
    validate() { }
    ;
}
//# sourceMappingURL=command.js.map