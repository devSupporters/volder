export const validateInt = (input) => {
    return input % 1 === 0;
}
export const validateFloat = (input) => {
    return input % 1 !== 0;
}