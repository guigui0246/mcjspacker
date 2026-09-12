import { AmountArgument, EntityArgument, ItemArgument, ItemComponentsArgument } from "../index.ts";
import { Command } from "./command.ts";

let _item: ItemArgument | null = null;
let _data: number | null = null;
let _components: ItemComponentsArgument | null = null;

export class GiveCommand extends Command {

    public constructor(
        target: EntityArgument | string,
        item: ItemArgument | string,
        amount?: AmountArgument | number,
        data?: number,
        components?: ItemComponentsArgument | object,
    ) {
        _item = null;
        _data = null;
        _components = null;
        if (typeof target === "string") {
            target = new EntityArgument(target);
        }
        if (typeof item === "string") {
            item = new ItemArgument(item);
        }
        _item = item;
        if (typeof amount === "undefined") {
            super("give", target, item);
            return
        }
        if (typeof amount === "number") {
            amount = new AmountArgument(amount);
        }
        if (typeof data === "undefined") {
            super("give", target, item, amount);
            return
        }
        _data = data;
        let strdata = data.toString();
        if (typeof components === "undefined") {
            super("give", target, item, amount, strdata);
            return
        }
        if (!(components instanceof ItemComponentsArgument)) {
            components = new ItemComponentsArgument(components);
        }
        _components = components as ItemComponentsArgument;
        super("give", target, item, amount, strdata, components as ItemComponentsArgument);
    }

    public validate(): void {
        if (_data) {
            if (_data < 0) {
                throw new Error("Data cannot be negative.");
            }
            if (_data > 32767) {
                throw new Error("Data cannot be greater than 32767.");
            }
        }
        if (!(_item && _item.hasComponents())) {
            return;
        }
        if (_data !== null) {
            throw new Error(
                "item[components] is Java only and data is Bedrock only."
            );
        }
        if (_components !== null) {
            throw new Error(
                "item[components] is Java only and components is Bedrock only."
            );
        }
    };
}

export function give(
    target: EntityArgument | string,
    item: ItemArgument | string,
    amount?: AmountArgument | number,
    data?: number,
    components?: ItemComponentsArgument | object,
): GiveCommand {
    return new GiveCommand(target, item, amount, data, components);
}
