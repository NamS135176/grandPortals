/**
 *
 * @param {String?} name format is ${first_name}<space>${last_name}
 * @returns Array of string with 2values. index 1 is lastname, index 2 is first name
 */
export const parseUserName = (name) => {
    let result = [name ?? "", ""];
    if (name) {
        try {
            const splits = name.split(" ");
            if (splits.length >= 2) {
                result[0] = splits[1];
                result[1] = splits[0];
            }
        } catch (e) {}
    }
    return result;
};
