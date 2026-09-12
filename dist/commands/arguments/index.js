import { verifyPositiveNumber, verifyUser } from "./verifiers.js";
class Argument {
    toString() {
        let [template, args] = this.toTemplate();
        if (args.length === 0) {
            return template.toString();
        }
        throw new Error("Cannot convert argument to string because it contains non-string arguments.");
    }
}
class StringArgument extends Argument {
    txt;
    constructor(txt) {
        super();
        this.txt = txt;
    }
    toTemplate() {
        return [this.txt, []];
    }
}
class NumberArgument extends Argument {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    toTemplate() {
        return [this.value.toString(), []];
    }
}
class BooleanArgument extends Argument {
    bool;
    constructor(bool) {
        super();
        this.bool = bool;
    }
    toTemplate() {
        return [this.bool.toString(), []];
    }
}
export class EntityArgument extends StringArgument {
    user;
    constructor(user) {
        verifyUser(user);
        super(user);
        this.user = user;
    }
}
export class ItemArgument extends StringArgument {
    item;
    constructor(item) {
        // TODO: verifyItem(item);
        // item or item[data]
        super(item);
        this.item = item;
    }
    hasComponents() {
        return this.item.includes("[") && this.item.includes("]");
    }
}
export class AmountArgument extends NumberArgument {
    amount;
    constructor(amount) {
        verifyPositiveNumber(amount, false);
        if (amount > 32767) {
            throw new Error("Amount cannot be greater than 32767.");
        }
        super(amount);
        this.amount = amount;
    }
}
class JsonArgument extends Argument {
    json;
    constructor(json) {
        super();
        this.json = json;
    }
    toTemplate() {
        return [JSON.stringify(this.json), []];
    }
}
export class ItemComponentsArgument extends JsonArgument {
    constructor(components) {
        // TODO: verifyItemComponents(components);
        super(components);
    }
}
//# sourceMappingURL=index.js.map