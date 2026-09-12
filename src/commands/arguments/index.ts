import { verifyPositiveNumber, verifyUser } from "./verifiers.ts";

abstract class Argument {
    public abstract toTemplate(): [ValidParam1, ValidParam2[]];

    public toString(): string {
        let [template, args] = this.toTemplate();
        if (args.length === 0) {
            return template.toString();
        }
        throw new Error(
            "Cannot convert argument to string because it contains non-string arguments."
        );
    }
}

class StringArgument extends Argument {
    public txt: string;

    public constructor(txt: string) {
        super();
        this.txt = txt;
    }

    public toTemplate(): [ValidParam1, ValidParam2[]] {
        return [this.txt, []];
    }
}

class NumberArgument extends Argument {
    public value: number;

    public constructor(value: number) {
        super();
        this.value = value;
    }

    public toTemplate(): [ValidParam1, ValidParam2[]] {
        return [this.value.toString(), []];
    }
}

class BooleanArgument extends Argument {
    public bool: boolean;

    public constructor(bool: boolean) {
        super();
        this.bool = bool;
    }

    public toTemplate(): [ValidParam1, ValidParam2[]] {
        return [this.bool.toString(), []];
    }
}

export class EntityArgument extends StringArgument {
    public user: string;

    public constructor(user: string) {
        verifyUser(user);
        super(user);
        this.user = user;
    }
}

export class ItemArgument extends StringArgument {
    public item: string;

    public constructor(item: string) {
        // TODO: verifyItem(item);
        // item or item[data]
        super(item);
        this.item = item;
    }

    public hasComponents(): boolean {
        return this.item.includes("[") && this.item.includes("]");
    }
}

export class AmountArgument extends NumberArgument {
    public amount: number;

    public constructor(amount: number) {
        verifyPositiveNumber(amount, false);
        if (amount > 32767) {
            throw new Error("Amount cannot be greater than 32767.");
        }
        super(amount);
        this.amount = amount;
    }
}

class JsonArgument extends Argument {
    public json: object;

    public constructor(json: object) {
        super();
        this.json = json;
    }

    public toTemplate(): [ValidParam1, ValidParam2[]] {
        return [JSON.stringify(this.json), []];
    }
}

export class ItemComponentsArgument extends JsonArgument {
    public constructor(components: object) {
        // TODO: verifyItemComponents(components);
        super(components);
    }
}
