export const booleanCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  const isBoolean = typeof input[optionName] === 'boolean' || input[optionName] instanceof Boolean;

  if (!isBoolean) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be a boolean (true or false)`;
    }
    return false;
  }


  return true;
};
