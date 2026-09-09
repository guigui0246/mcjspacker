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
    toTemplate() {
        let commandString = this.command;
        if (!this.args) {
            return [commandString, []];
        }
        if (this.args.every(arg => typeof arg === "string")) {
            commandString += " " + this.args.join(" ");
            return [commandString, []];
        }
        let commandTemplate = [commandString];
        let args = [];
        for (const arg of this.args) {
            if (typeof arg === "string") {
                commandTemplate[commandTemplate.length - 1] += " " + arg;
            }
            else {
                commandTemplate[commandTemplate.length - 1] += " ";
                args.push(arg);
                commandTemplate.push("");
            }
        }
        const template = Object.assign(commandTemplate, {
            raw: commandTemplate,
        });
        return [template, args];
    }
}
export class CustomCommand extends Command {
    validate() { }
    ;
}
//# sourceMappingURL=command.js.map