import { verifyUser } from "./verifiers.ts";

abstract class Argument {
    public abstract toTemplate(): [ValidParam1, ValidParam2[]];
}

export class StringArgument extends Argument {
    public txt: string;

    public constructor(txt: string) {
        super();
        this.txt = txt;
    }

    public toTemplate(): [ValidParam1, ValidParam2[]] {
        return [this.txt, []];
    }
}

export class NumberArgument extends Argument {
    public value: number;

    public constructor(value: number) {
        super();
        this.value = value;
    }

    public toTemplate(): [ValidParam1, ValidParam2[]] {
        return [this.value.toString(), []];
    }
}

export class BooleanArgument extends Argument {
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
