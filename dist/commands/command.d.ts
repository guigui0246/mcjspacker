export declare abstract class Command implements CommandProto {
    private command;
    private args;
    constructor(command: CommandType, ...args: ValidParam2[]);
    constructor(command: FullCommand);
    abstract validate(): void;
    toTemplate(): [ValidParam1, ValidParam2[]];
}
export declare class CustomCommand extends Command {
    validate(): void;
}
//# sourceMappingURL=command.d.ts.map