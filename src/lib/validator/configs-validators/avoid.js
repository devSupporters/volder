export const validateAvoid = (input, avoidConfig) => {
  // extract input option name type
  const typeOfInput = typeof input;
  const inputTypeInJS =
    typeOfInput === 'string'
      ? String
      : typeOfInput === 'undefined'
      ? undefined
      : typeOfInput === 'number'
      ? Number
      : typeOfInput === 'boolean'
      ? Boolean
      : typeOfInput === 'object' && Array.isArray(input)
      ? Array
      : typeOfInput === 'object' && input === null
      ? null
      : Object;
  if (avoidConfig.includes(inputTypeInJS))
    return {
      valid: false,
      type: inputTypeInJS === null ? 'null' : inputTypeInJS === undefined ? 'undefined' : inputTypeInJS.name
    };

  return { valid: true };
};
