export const booleanCase = (
  input: any,
  optionName: string,
  optionConfigs: any,
  errors: any
): void | boolean => {
  const isBoolean = typeof input[optionName] === 'boolean' || input[optionName] instanceof Boolean;

  if (!isBoolean) {
    errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be a boolean (true or false)`;
    return false;
  }
};
