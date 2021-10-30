export const stringCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  const isString = typeof input[optionName] === 'string' || input[optionName] instanceof String;

  if (!isString) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be a string`;
    }

    return false;
  }

  if (optionConfigs.hasOwnProperty('trim') && optionConfigs.trim) {
    input[optionName] = input[optionName].trim();

    // check input = 0 & config min != 0 & required = true;
    if (input[optionName].length === 0 && optionConfigs.min !== 0 && optionConfigs.required === true) {
      errors[optionName] = optionConfigs.requiredErrorMessage || `${optionName} is required`;
    }
  }

  if (optionConfigs.hasOwnProperty('min') && input[optionName].length < optionConfigs.min) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.minErrorMessage || `${optionName} should be at least ${optionConfigs.min} characters`;
    }

    return false;
  }

  if (optionConfigs.hasOwnProperty('max') && input[optionName].length > optionConfigs.max) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.maxErrorMessage || `${optionName} should be at most ${optionConfigs.max} characters`;
    }

    return false;
  }

  return true;
};
