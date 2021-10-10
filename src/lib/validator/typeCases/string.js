export const stringCase = (input, optionName, optionConfigs, errors) => {
    const isString = typeof input[optionName] === 'string' || input[optionName] instanceof String;

    if (!isString) {
        errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be a string`;
        return false;
    }

    if (optionConfigs.hasOwnProperty('trim') && optionConfigs.trim) {
        input[optionName] = input[optionName].trim();
    }

    if (optionConfigs.hasOwnProperty('min') && input[optionName].length < optionConfigs.min) {
        errors[optionName] =
            optionConfigs.minErrorMessage ||
            `${optionName} should be at least ${optionConfigs.min} characters`;
        return false;
    }

    if (optionConfigs.hasOwnProperty('max') && input[optionName].length > optionConfigs.max) {
        errors[optionName] =
            optionConfigs.maxErrorMessage ||
            `${optionName} should be at most ${optionConfigs.max} characters`;
        return false;
    }
};
