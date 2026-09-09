import { verifyUser } from "./verifiers.js";

abstract class Argument {
    public abstract toTemplate(): [ValidParam1, ValidParam2[]];
}

export class StringArgument extends Argument {
    public constructor(
        public txt: string
    ) {
        super();
    }

    public toTemplate(): [ValidParam1, ValidParam2[]] {
        return [this.txt, []];
    }
}

export class NumberArgument extends Argument {
    public constructor(
        public value: number
    ) {
        super();
    }

    public toTemplate(): [ValidParam1, ValidParam2[]] {
        return [this.value.toString(), []];
    }
}

export class BooleanArgument extends Argument {
    public constructor(
        public bool: boolean
    ) {
        super();
    }

    public toTemplate(): [ValidParam1, ValidParam2[]] {
        return [this.bool.toString(), []];
    }
}

export class EntityArgument extends StringArgument {
    public constructor(
        public user: string
    ) {
        verifyUser(user);
        super(user);
    }
}
