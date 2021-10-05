export const arrayCase = (
  input: any,
  optionName: string,
  optionConfigs: any,
  errors: any
): void | boolean => {
  const isArray = Array.isArray(input[optionName]);

  if (!isArray) {
    errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be an array`;
    return false;
  }

  if (optionConfigs.hasOwnProperty('min') && input[optionName].length < optionConfigs.min) {
    errors[optionName] = optionConfigs.minErrorMessage || `${optionName} should be at least ${optionConfigs.min} items`;
    return false;
  }

  if (optionConfigs.hasOwnProperty('max')  && input[optionName].length > optionConfigs.max) {
    errors[optionName] = optionConfigs.maxErrorMessage || `${optionName} should be at most ${optionConfigs.max} items`;
    return false;
  }
};
