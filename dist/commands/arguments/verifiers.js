export function verifyUUID(uuid) {
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
export function verifyUser(user) {
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
//# sourceMappingURL=verifiers.js.map