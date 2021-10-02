export const objectCase = (input: any, optionName: string, errors: any): boolean | void => {
  const isObject =
    typeof input[optionName] === 'object' &&
    !Array.isArray(input[optionName]) &&
    input[optionName] !== null;

  if (!isObject) {
    errors[optionName] = `${optionName} should be a object`;
    return false;
  }
};
