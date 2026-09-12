declare abstract class Argument {
    abstract toTemplate(): [ValidParam1, ValidParam2[]];
    toString(): string;
}
declare class StringArgument extends Argument {
    txt: string;
    constructor(txt: string);
    toTemplate(): [ValidParam1, ValidParam2[]];
}
declare class NumberArgument extends Argument {
    value: number;
    constructor(value: number);
    toTemplate(): [ValidParam1, ValidParam2[]];
}
export declare class EntityArgument extends StringArgument {
    user: string;
    constructor(user: string);
}
export declare class ItemArgument extends StringArgument {
    item: string;
    constructor(item: string);
    hasComponents(): boolean;
}
export declare class AmountArgument extends NumberArgument {
    amount: number;
    constructor(amount: number);
}
declare class JsonArgument extends Argument {
    json: object;
    constructor(json: object);
    toTemplate(): [ValidParam1, ValidParam2[]];
}
export declare class ItemComponentsArgument extends JsonArgument {
    constructor(components: object);
}
export {};
//# sourceMappingURL=index.d.ts.map