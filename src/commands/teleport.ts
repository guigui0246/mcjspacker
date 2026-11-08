import { EntityArgument, PositionArgument, RotationArgument } from "../index.ts";
import { Command } from "./command.ts";

export class TeleportCommand extends Command {

    public constructor(
        Destination: EntityArgument | PositionArgument | string,
        checkForBlocks?: boolean
    );

    public constructor(
        Target: EntityArgument | string,
        Destination: EntityArgument | PositionArgument | string,
        rotation?: RotationArgument | string,
        checkForBlocks?: boolean
    );

    public constructor(
        Target: EntityArgument | string,
        DestinationX: number | string,
        DestinationY: number | string,
        DestinationZ: number | string,
        rotation?: RotationArgument | string,
        checkForBlocks?: boolean
    );

    public constructor(
        Target: EntityArgument | string,
        Destination: EntityArgument | PositionArgument | string,
        rotationX: number | string,
        rotationY: number | string,
        checkForBlocks?: boolean
    );

    public constructor(
        Target: EntityArgument | string,
        DestinationX: number | string,
        DestinationY: number | string,
        DestinationZ: number | string,
        rotationX: number | string,
        rotationY: number | string,
        checkForBlocks?: boolean
    );

    public constructor(
        Target: EntityArgument | string,
        Destination: EntityArgument | PositionArgument | string,
        facing: "facing",
        Facing: EntityArgument | PositionArgument | string,
        checkForBlocks?: boolean
    );

    public constructor(
        Target: EntityArgument | string,
        DestinationX: number | string,
        DestinationY: number | string,
        DestinationZ: number | string,
        facing: "facing",
        Facing: EntityArgument | PositionArgument | string,
        checkForBlocks?: boolean
    );

    public constructor(
        Target: EntityArgument | string,
        Destination: EntityArgument | PositionArgument | string,
        facing: "facing",
        entity: "entity",
        Facing: EntityArgument | string,
        anchor?: "eyes" | "feet"
    );

    public constructor(
        Target: EntityArgument | string,
        DestinationX: number | string,
        DestinationY: number | string,
        DestinationZ: number | string,
        facing: "facing",
        entity: "entity",
        Facing: EntityArgument | string,
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

export function teleport(
    Destination: EntityArgument | PositionArgument | string,
    checkForBlocks?: boolean
): TeleportCommand;

export function teleport(
    Target: EntityArgument | string,
    Destination: EntityArgument | PositionArgument | string,
    rotation?: RotationArgument | string,
    checkForBlocks?: boolean
): TeleportCommand;

export function teleport(
    Target: EntityArgument | string,
    DestinationX: number | string,
    DestinationY: number | string,
    DestinationZ: number | string,
    rotation?: RotationArgument | string,
    checkForBlocks?: boolean
): TeleportCommand;

export function teleport(
    Target: EntityArgument | string,
    Destination: EntityArgument | PositionArgument | string,
    rotationX: number | string,
    rotationY: number | string,
    checkForBlocks?: boolean
): TeleportCommand;

export function teleport(
    Target: EntityArgument | string,
    DestinationX: number | string,
    DestinationY: number | string,
    DestinationZ: number | string,
    rotationX: number | string,
    rotationY: number | string,
    checkForBlocks?: boolean
): TeleportCommand;

export function teleport(
    Target: EntityArgument | string,
    Destination: EntityArgument | PositionArgument | string,
    facing: "facing",
    Facing: EntityArgument | PositionArgument | string,
    checkForBlocks?: boolean
): TeleportCommand;

export function teleport(
    Target: EntityArgument | string,
    DestinationX: number | string,
    DestinationY: number | string,
    DestinationZ: number | string,
    facing: "facing",
    Facing: EntityArgument | PositionArgument | string,
    checkForBlocks?: boolean
): TeleportCommand;

export function teleport(
    Target: EntityArgument | string,
    Destination: EntityArgument | PositionArgument | string,
    facing: "facing",
    entity: "entity",
    Facing: EntityArgument | string,
    anchor?: "eyes" | "feet"
): TeleportCommand;

export function teleport(
    Target: EntityArgument | string,
    DestinationX: number | string,
    DestinationY: number | string,
    DestinationZ: number | string,
    facing: "facing",
    entity: "entity",
    Facing: EntityArgument | string,
    anchor?: "eyes" | "feet"
): TeleportCommand;

export function teleport(
    ...args: unknown[]
): TeleportCommand {
    return new TeleportCommand(...args as ConstructorParameters<typeof TeleportCommand>);
}

export const tp = teleport;
export const TpCommand = TeleportCommand;
