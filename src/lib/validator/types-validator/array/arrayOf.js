export const validateArrayOf = (input, arrOfConfig) => {
    const inputType = input === null ? null : input === undefined ? undefined : input.constructor;

    if(inputType != arrOfConfig) return false;

    return true
}