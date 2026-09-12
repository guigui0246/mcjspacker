export function verifyUUID(uuid: string): void {
    if (uuid.startsWith("[I;")) {
        const intArray = uuid.slice(3, -1).split(",").map((v) => parseInt(v));
        if (intArray.some((v) => isNaN(v))) {
            throw new Error(`Invalid UUID argument: ${uuid}. UUID arguments must be in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx or [I;xxxx,xxxx,xxxx,xxxx].`);
        }
        return;
    }
    const uuidRegex = /^[0-9a-f]{1,8}-[0-9a-f]{1,4}-[0-9a-f]{1,4}-[0-9a-f]{1,4}-[0-9a-f]{1,12}$/i;
    if (uuidRegex.test(uuid)) {
        return;
    }
    throw new Error(`Invalid UUID argument: ${uuid}. UUID arguments must be in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx or [I;xxxx,xxxx,xxxx,xxxx].`);
}

export function verifyUser(user: string): void {
    if (user.startsWith("@")) {
        if (user.length < 2) {
            throw new Error(`Invalid user argument: ${user}. Target selectors must have a character after the '@'.`);
        }
        if (!(["p", "n", "r", "a", "e", "s", "c", "v", "initiator"].some((v) => user.slice(1).startsWith(v)))) {
            throw new Error(`Invalid target selector: ${user}.`);
        }
        return;
    }
    // Valid usernames because some people got them before the 3 minimum or no special char rule
    if (user.length < 16 && !user.startsWith("[") && !user.includes(" ")) {
        return;
    }
    if (user.match(/[0-9]+/)) {
        verifyUUID(user);
        return;
    }
    throw new Error(`Invalid user argument: ${user}. Usernames must be less than 16 characters or a valid UUID.`);
}

export function verifyPositiveNumber(num: number, allowZero: boolean = true): void {
    if (typeof num !== "number" || isNaN(num)) {
        throw new Error(`Invalid number argument: ${num}. Must be a valid number.`);
    }
    if (num < 0) {
        throw new Error(`Invalid number argument: ${num}. Must be a non-negative number.`);
    }
    if (!allowZero && num === 0) {
        throw new Error(`Invalid number argument: ${num}. Must be a strictly positive number.`);
    }
}
