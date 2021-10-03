export const nullCase = (
  input: any,
  optionName: string,
  optionConfigs: any,
  errors: any
): void | boolean => {
  if (optionConfigs.hasOwnProperty('avoid')) {
    // extract input option name type
    const typeOfInput = typeof input[optionName];
    const inputConstructorFunction =
      typeOfInput === 'string'
        ? String
        : typeOfInput === 'number'
        ? Number
        : typeOfInput === 'boolean'
        ? Boolean
        : typeOfInput === 'object' && Array.isArray(input[optionName])
        ? Array
        : Object;
    if (optionConfigs.includes(inputConstructorFunction)) {
      errors[optionName] = `${inputConstructorFunction} type not allowed`;
      return false;
    }
  }
};
