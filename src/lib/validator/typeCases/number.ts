export const numberCase = (
  input: any,
  optionName: string,
  optionConfigs: any,
  errors: any
): void | boolean => {
  const isNumber = typeof input[optionName] === 'number' || input[optionName] instanceof Number;

  if (!isNumber) {
    errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be a number`;
    return false;
  }

  if (optionConfigs.hasOwnProperty('min')  && input[optionName] < optionConfigs.min) {
    errors[optionName] = optionConfigs.minErrorMessage || `${optionName} should be at least ${optionConfigs.min}`;
    return false;
  }

  if (optionConfigs.hasOwnProperty('max')  && input[optionName] > optionConfigs.max) {
    errors[optionName] = optionConfigs.maxErrorMessage || `${optionName} should be at most ${optionConfigs.max}`;
    return false;
  }
};
