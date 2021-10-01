export const booleanCase = (
  input: any,
  optionName: string,
//   optionConfigs: any,
  errors: any
): void | boolean => {
    
    const isBoolean = typeof input[optionName] === 'boolean' || input instanceof Boolean 

    if (!isBoolean) {
        errors[optionName] = `${optionName} should be a number`;
        return false;
      }
};
