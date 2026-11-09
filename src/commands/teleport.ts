import { EntityArgument, PositionArgument, RotationArgument } from "../index.ts";
import { Command } from "./command.ts";

export class TeleportCommand<JavaSpecific extends boolean = false, BedrockSpecific extends boolean = false> extends Command<JavaSpecific, BedrockSpecific> {

    public constructor(
        Destination: EntityArgument<JavaSpecific, BedrockSpecific> | PositionArgument | string,
        checkForBlocks?: BedrockSpecific extends true ? boolean : never
    );

    public constructor(
        Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
        Destination: EntityArgument<JavaSpecific, BedrockSpecific> | PositionArgument | string,
        rotation?: RotationArgument | string,
        checkForBlocks?: BedrockSpecific extends true ? boolean : never
    );

    public constructor(
        Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
        DestinationX: number | string,
        DestinationY: number | string,
        DestinationZ: number | string,
        rotation?: RotationArgument | string,
        checkForBlocks?: BedrockSpecific extends true ? boolean : never
    );

    public constructor(
        Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
        Destination: EntityArgument<JavaSpecific, BedrockSpecific> | PositionArgument | string,
        rotationX: number | string,
        rotationY: number | string,
        checkForBlocks?: BedrockSpecific extends true ? boolean : never
    );

    public constructor(
        Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
        DestinationX: number | string,
        DestinationY: number | string,
        DestinationZ: number | string,
        rotationX: number | string,
        rotationY: number | string,
        checkForBlocks?: BedrockSpecific extends true ? boolean : never
    );

    public constructor(
        Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
        Destination: EntityArgument<JavaSpecific, BedrockSpecific> | PositionArgument | string,
        facing: "facing",
        Facing: EntityArgument<JavaSpecific, BedrockSpecific> | PositionArgument | string,
        checkForBlocks?: BedrockSpecific extends true ? boolean : never
    );

    public constructor(
        Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
        DestinationX: number | string,
        DestinationY: number | string,
        DestinationZ: number | string,
        facing: "facing",
        Facing: EntityArgument<JavaSpecific, BedrockSpecific> | PositionArgument | string,
        checkForBlocks?: BedrockSpecific extends true ? boolean : never
    );

    public constructor(
        Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
        Destination: EntityArgument<JavaSpecific, BedrockSpecific> | PositionArgument | string,
        facing: "facing",
        entity: JavaSpecific extends true ? "entity" : never,
        Facing: EntityArgument<JavaSpecific, BedrockSpecific> | string,
        anchor?: "eyes" | "feet"
    );

    public constructor(
        Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
        DestinationX: number | string,
        DestinationY: number | string,
        DestinationZ: number | string,
        facing: "facing",
        entity: JavaSpecific extends true ? "entity" : never,
        Facing: EntityArgument<JavaSpecific, BedrockSpecific> | string,
        anchor?: "eyes" | "feet"
    );

    public constructor(
        ...args: unknown[]
    ) {
        const normalized: ValidParam2[] = [];

        let i = 0;

        // Destination-only form:
        // teleport <destination> [checkForBlocks]
        if (args.length <= 2) {
            normalized.push(args[0] as ValidParam2);

            if (args[1] !== undefined) {
                normalized.push(String(args[1]));
            }

            super("teleport", ...normalized);
            return;
        }

        // Target
        normalized.push(args[i++] as ValidParam2);

        // Destination
        if (
            typeof args[i] === "number" &&
            typeof args[i + 1] === "number" &&
            typeof args[i + 2] === "number"
        ) {
            normalized.push(
                new PositionArgument(
                    args[i] as number,
                    args[i + 1] as number,
                    args[i + 2] as number
                )
            );

            i += 3;
        } else {
            normalized.push(args[i++] as ValidParam2);
        }

        // Remaining arguments
        if (
            typeof args[i] === "number" &&
            typeof args[i + 1] === "number"
        ) {
            normalized.push(
                new RotationArgument(
                    args[i] as number,
                    args[i + 1] as number
                )
            );

            i += 2;
        }

        while (i < args.length) {
            const arg = args[i++];

            if (arg !== undefined) {
                normalized.push(
                    typeof arg === "boolean"
                        ? String(arg)
                        : arg as ValidParam2
                );
            }
        }

        super("teleport", ...normalized);
    }

    public validate(): void {
    };
}

export function teleport<
    JavaSpecific extends boolean = false,
    BedrockSpecific extends boolean = false
>(
    Destination: EntityArgument<JavaSpecific, BedrockSpecific> | PositionArgument | string,
    checkForBlocks?: BedrockSpecific extends true ? boolean : never
): TeleportCommand<JavaSpecific, BedrockSpecific>;

export function teleport<
    JavaSpecific extends boolean = false,
    BedrockSpecific extends boolean = false
>(
    Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
    Destination: EntityArgument<JavaSpecific, BedrockSpecific> | PositionArgument | string,
    rotation?: RotationArgument | string,
    checkForBlocks?: BedrockSpecific extends true ? boolean : never
): TeleportCommand<JavaSpecific, BedrockSpecific>;

export function teleport<
    JavaSpecific extends boolean = false,
    BedrockSpecific extends boolean = false
>(
    Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
    DestinationX: number | string,
    DestinationY: number | string,
    DestinationZ: number | string,
    rotation?: RotationArgument | string,
    checkForBlocks?: BedrockSpecific extends true ? boolean : never
): TeleportCommand<JavaSpecific, BedrockSpecific>;

export function teleport<
    JavaSpecific extends boolean = false,
    BedrockSpecific extends boolean = false
>(
    Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
    Destination: EntityArgument<JavaSpecific, BedrockSpecific> | PositionArgument | string,
    rotationX: number | string,
    rotationY: number | string,
    checkForBlocks?: boolean
): TeleportCommand<JavaSpecific, BedrockSpecific>;

export function teleport<
    JavaSpecific extends boolean = false,
    BedrockSpecific extends boolean = false
>(
    Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
    DestinationX: number | string,
    DestinationY: number | string,
    DestinationZ: number | string,
    rotationX: number | string,
    rotationY: number | string,
    checkForBlocks?: boolean
): TeleportCommand<JavaSpecific, BedrockSpecific>;

export function teleport<
    JavaSpecific extends boolean = false,
    BedrockSpecific extends boolean = false
>(
    Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
    Destination: EntityArgument<JavaSpecific, BedrockSpecific> | PositionArgument | string,
    facing: "facing",
    Facing: EntityArgument<JavaSpecific, BedrockSpecific> | PositionArgument | string,
    checkForBlocks?: boolean
): TeleportCommand<JavaSpecific, BedrockSpecific>;

export function teleport<
    JavaSpecific extends boolean = false,
    BedrockSpecific extends boolean = false
>(
    Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
    DestinationX: number | string,
    DestinationY: number | string,
    DestinationZ: number | string,
    facing: "facing",
    Facing: EntityArgument<JavaSpecific, BedrockSpecific> | PositionArgument | string,
    checkForBlocks?: boolean
): TeleportCommand<JavaSpecific, BedrockSpecific>;

export function teleport<
    JavaSpecific extends boolean = false,
    BedrockSpecific extends boolean = false
>(
    Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
    Destination: EntityArgument<JavaSpecific, BedrockSpecific> | PositionArgument | string,
    facing: "facing",
    entity: "entity",
    Facing: EntityArgument<JavaSpecific, BedrockSpecific> | string,
    anchor?: "eyes" | "feet"
): TeleportCommand<JavaSpecific, BedrockSpecific>;

export function teleport<
    JavaSpecific extends boolean = false,
    BedrockSpecific extends boolean = false
>(
    Target: EntityArgument<JavaSpecific, BedrockSpecific> | string,
    DestinationX: number | string,
    DestinationY: number | string,
    DestinationZ: number | string,
    facing: "facing",
    entity: "entity",
    Facing: EntityArgument<JavaSpecific, BedrockSpecific> | string,
    anchor?: "eyes" | "feet"
): TeleportCommand<JavaSpecific, BedrockSpecific>;

export function teleport<
    JavaSpecific extends boolean = false,
    BedrockSpecific extends boolean = false
>(
    ...args: unknown[]
): TeleportCommand<JavaSpecific, BedrockSpecific> {
    return new TeleportCommand<JavaSpecific, BedrockSpecific>(...args as ConstructorParameters<typeof TeleportCommand<JavaSpecific, BedrockSpecific>>);
}

export const tp = teleport;
export const TpCommand = TeleportCommand;
