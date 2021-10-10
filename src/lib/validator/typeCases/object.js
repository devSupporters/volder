export const objectCase = (input, optionName, optionConfigs, errors) => {
    const isObject =
        typeof input[optionName] === 'object' &&
        !Array.isArray(input[optionName]) &&
        input[optionName] !== null;

    if (!isObject) {
        errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be an object`;
        return false;
    }
};
