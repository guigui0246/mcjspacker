import { Lvl3or4Command } from './command.ts';

export class BanCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("ban", ...args.map(arg => String(arg)) as any);
    }
}
export function ban(...args: any[]) {
    return new BanCommand(...args);
}

export class BanIpCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("ban-ip", ...args.map(arg => String(arg)) as any);
    }
}
export function banIp(...args: any[]) {
    return new BanIpCommand(...args);
}

export class BanListCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("banlist", ...args.map(arg => String(arg)) as any);
    }
}
export function banList(...args: any[]) {
    return new BanListCommand(...args);
}

export class DebugCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("debug", ...args.map(arg => String(arg)) as any);
    }
}
export function debug(...args: any[]) {
    return new DebugCommand(...args);
}

export class DeopCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("deop", ...args.map(arg => String(arg)) as any);
    }
}
export function deop(...args: any[]) {
    return new DeopCommand(...args);
}

export class KickCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("kick", ...args.map(arg => String(arg)) as any);
    }
}
export function kick(...args: any[]) {
    return new KickCommand(...args);
}

export class OpCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("op", ...args.map(arg => String(arg)) as any);
    }
}
export function op(...args: any[]) {
    return new OpCommand(...args);
}

export class PardonCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("pardon", ...args.map(arg => String(arg)) as any);
    }
}
export function pardon(...args: any[]) {
    return new PardonCommand(...args);
}

export class PardonIpCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("pardon-ip", ...args.map(arg => String(arg)) as any);
    }
}
export function pardonIp(...args: any[]) {
    return new PardonIpCommand(...args);
}

export class SetIdleTimeoutCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("setidletimeout", ...args.map(arg => String(arg)) as any);
    }
}
export function setIdleTimeout(...args: any[]) {
    return new SetIdleTimeoutCommand(...args);
}

export class TickCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("tick", ...args.map(arg => String(arg)) as any);
    }
}
export function tick(...args: any[]) {
    return new TickCommand(...args);
}

export class TransferCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("transfer", ...args.map(arg => String(arg)) as any);
    }
}
export function transfer(...args: any[]) {
    return new TransferCommand(...args);
}

export class WhitelistCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("whitelist", ...args.map(arg => String(arg)) as any);
    }
}
export function whitelist(...args: any[]) {
    return new WhitelistCommand(...args);
}

export class JfrCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("jfr", ...args.map(arg => String(arg)) as any);
    }
}
export function jfr(...args: any[]) {
    return new JfrCommand(...args);
}

export class PerfCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("perf", ...args.map(arg => String(arg)) as any);
    }
}
export function perf(...args: any[]) {
    return new PerfCommand(...args);
}

export class PublishCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("publish", ...args.map(arg => String(arg)) as any);
    }
}
export function publish(...args: any[]) {
    return new PublishCommand(...args);
}

export class SaveAllCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("save-all", ...args.map(arg => String(arg)) as any);
    }
}
export function saveAll(...args: any[]) {
    return new SaveAllCommand(...args);
}

export class SaveOffCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("save-off", ...args.map(arg => String(arg)) as any);
    }
}
export function saveOff(...args: any[]) {
    return new SaveOffCommand(...args);
}

export class SaveOnCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("save-on", ...args.map(arg => String(arg)) as any);
    }
}
export function saveOn(...args: any[]) {
    return new SaveOnCommand(...args);
}

export class StopCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("stop", ...args.map(arg => String(arg)) as any);
    }
}
export function stop(...args: any[]) {
    return new StopCommand(...args);
}

export class UnpublishCommand extends Lvl3or4Command {
    constructor(...args: any[]) {
        super("unpublish", ...args.map(arg => String(arg)) as any);
    }
}
export function unpublish(...args: any[]) {
    return new UnpublishCommand(...args);
}
