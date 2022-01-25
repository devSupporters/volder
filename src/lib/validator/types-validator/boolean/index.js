export const booleanCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  const isBoolean = typeof input[optionName] === 'boolean' || input[optionName] instanceof Boolean;

  if (!isBoolean && !optionConfigs.sensible) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be a boolean (true or false)`;
    }
    return false;
  }

  if (optionConfigs.hasOwnProperty('state') && !input[optionName] == optionConfigs.state) {
    if (collectErrors) {
      const ErrMessage = `${optionName} should be a ${
        !optionConfigs.sensible ? optionConfigs.state : optionConfigs.state ? 'Truthy' : 'Falsy'
      } value`;
      errors[optionName] = optionConfigs.stateErrorMessage || ErrMessage;
    }
    return false;
  }

  if(optionConfigs.switch && optionConfigs.sensible) {
    input[optionName] = !!input[optionName];
  }

  return true;
};
