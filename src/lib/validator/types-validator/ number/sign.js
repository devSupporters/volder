export const validateSign = (input, sign) => {
    return sign === 'positive' ? 0 <= input : 0 >= input;
}