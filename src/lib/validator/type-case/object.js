export const objectCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  const isObject = typeof input[optionName] === 'object' && !Array.isArray(input[optionName]) && input[optionName] !== null;

  if (!isObject) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be an object`;
    }

    return false;
  }

  if (optionConfigs.hasOwnProperty('pattern') && !!optionConfigs.pattern(input[optionName])) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.patternErrorMessage || `${optionName} is not in proper pattern `;
    }

    return false;
  }

  return true;
};
