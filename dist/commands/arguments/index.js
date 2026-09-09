import { verifyUser } from "./verifiers.js";
class Argument {
}
export class StringArgument extends Argument {
    txt;
    constructor(txt) {
        super();
        this.txt = txt;
    }
    toTemplate() {
        return [this.txt, []];
    }
}
export class NumberArgument extends Argument {
    value;
    constructor(value) {
        super();
        this.value = value;
    }
    toTemplate() {
        return [this.value.toString(), []];
    }
}
export class BooleanArgument extends Argument {
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
//# sourceMappingURL=index.js.map