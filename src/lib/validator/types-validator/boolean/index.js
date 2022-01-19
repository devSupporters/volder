export const booleanCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  const isBoolean = typeof input[optionName] === 'boolean' || input[optionName] instanceof Boolean;

  if (!isBoolean && !optionConfigs.sensible) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be a boolean (true or false)`;
    }
    return false;
  }

  if (
    (optionConfigs.hasOwnProperty('state') && input[optionName] === optionConfigs.state) ||
    (!!input[optionName] === optionConfigs.state && optionConfigs.sensible)
  ) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be a boolean (true or false)`;
    }
    return false;
  }

  return true;
};
