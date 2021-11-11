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

    if (input[optionName].length === 0 && optionConfigs.required === true && optionConfigs.min !== 0) {
      errors[optionName] = optionConfigs.requiredErrorMessage || `${optionName} is required`;

      return false;
    }
  }

  if (optionConfigs.hasOwnProperty('minLength') && input[optionName].length < optionConfigs.minLength) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.minLengthErrorMessage || `${optionName} should be at least ${optionConfigs.minLength} length`;
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
