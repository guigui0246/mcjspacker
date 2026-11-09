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

export class EntityArgument<JavaSpecific extends boolean = false, BedrockSpecific extends boolean = false> extends StringArgument {
    public user: string;

    public constructor(user: string) {
        verifyUser(user);
        super(user);
        this.user = user;
    }
}

export class ItemArgument<JavaSpecific extends boolean = false, BedrockSpecific extends boolean = false> extends StringArgument {
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

export const Item = ItemArgument;

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

export const Amount = AmountArgument;

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

export class ItemComponentsArgument<JavaSpecific extends boolean = false, BedrockSpecific extends boolean = false> extends JsonArgument {
    public constructor(components: object) {
        // TODO: verifyItemComponents(components);
        super(components);
    }
}

export const ItemComponents = ItemComponentsArgument;

export class PositionArgument extends StringArgument {
    public constructor(position: string);

    // @description: Relative defaults to "world" if not specified.
    public constructor(x: number, y: number, z: number, relative?: RelativeTypes);

    public constructor(
        positionOrX: string | number,
        y?: number,
        z?: number,
        relative: RelativeTypes = "world"
    ) {
        if (typeof positionOrX === "string") {
            super(positionOrX);
        } else {
            if (typeof positionOrX != "number" || typeof y != "number" || typeof z != "number") {
                throw new Error("If the first argument is a number, the second and third arguments must also be numbers.");
            }
            if (relative === "world") {
                super(`${positionOrX} ${y} ${z}`);
            } else if (relative === "relative" || relative === "~") {
                super(`~${positionOrX} ~${y} ~${z}`);
            } else if (relative === "local" || relative === "^") {
                super(`^${positionOrX} ^${y} ^${z}`);
            }
        }
    }
}

export const Position = PositionArgument;

export class RotationArgument extends StringArgument {
    public constructor(rotation: string);

    public constructor(pitch: number, yaw: number, relative?: RelativeTypes);

    public constructor(
        rotationOrPitch: string | number,
        yaw?: number,
        relative: RelativeTypes = "world"
    ) {
        if (typeof rotationOrPitch === "string") {
            super(rotationOrPitch);
        } else {
            if (typeof rotationOrPitch != "number" || typeof yaw != "number") {
                throw new Error("If the first argument is a number, the second argument must also be a number.");
            }
            if (relative === "world") {
                super(`${rotationOrPitch} ${yaw}`);
            } else if (relative === "relative" || relative === "~") {
                super(`~${rotationOrPitch} ~${yaw}`);
            } else if (relative === "local" || relative === "^") {
                super(`^${rotationOrPitch} ^${yaw}`);
            }
        }
    }
}

export const Rotation = RotationArgument;
