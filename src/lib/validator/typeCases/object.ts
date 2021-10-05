export const objectCase = (
  input: any,
  optionName: string,
  optionConfigs: any,
  errors: any
): boolean | void => {
  const isObject =
    typeof input[optionName] === 'object' &&
    !Array.isArray(input[optionName]) &&
    input[optionName] !== null;

  if (!isObject) {
    errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be an object`;
    return false;
  }
};
