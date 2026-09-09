declare abstract class Argument {
    abstract toTemplate(): [ValidParam1, ValidParam2[]];
}
export declare class StringArgument extends Argument {
    txt: string;
    constructor(txt: string);
    toTemplate(): [ValidParam1, ValidParam2[]];
}
export declare class NumberArgument extends Argument {
    value: number;
    constructor(value: number);
    toTemplate(): [ValidParam1, ValidParam2[]];
}
export declare class BooleanArgument extends Argument {
    bool: boolean;
    constructor(bool: boolean);
    toTemplate(): [ValidParam1, ValidParam2[]];
}
export declare class EntityArgument extends StringArgument {
    user: string;
    constructor(user: string);
}
export {};
//# sourceMappingURL=index.d.ts.map