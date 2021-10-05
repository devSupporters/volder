export const stringCase = (
  input: any,
  optionName: string,
  optionConfigs: any,
  errors: any
): void | boolean => {
  const isString = typeof input[optionName] === 'string' || input[optionName] instanceof String;

  if (!isString) {
    errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be a string`;
    return false;
  }

  if (optionConfigs.trim) {
    input[optionName] = input[optionName].trim();
  }

  if (optionConfigs.min !== null && input[optionName].length < optionConfigs.min) {
    errors[optionName] = optionConfigs.minErrorMessage || `${optionName} should be at least ${optionConfigs.min} characters`;
    return false;
  }

  if (optionConfigs.max !== null && input[optionName].length > optionConfigs.max) {
    errors[optionName] = optionConfigs.maxErrorMessage || `${optionName} should be at most ${optionConfigs.max} characters`;
    return false;
  }
};
