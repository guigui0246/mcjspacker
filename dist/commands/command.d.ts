export declare abstract class Command<T extends string[]> {
    command: CommandType;
    args: T | null;
    constructor(command: CommandType, ...args: T);
    constructor(command: FullCommand);
    abstract validate(): void;
}
export declare class CustomCommand extends Command<string[]> {
    validate(): void;
}
//# sourceMappingURL=command.d.ts.map