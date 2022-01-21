import { validateInstance } from "./instance";

export const objectCase = (input, optionName, optionConfigs, errors, collectErrors, unclonedInput) => {
  const isObject = typeof input[optionName] === 'object' && !Array.isArray(input[optionName]) && input[optionName] !== null;

  if (!isObject) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be an object`;
    }

    return false;
  }

  if(optionConfigs.hasOwnProperty('instance') && !validateInstance(unclonedInput[optionName], optionConfigs.instance)) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.instanceErrorMessage || `${optionName} is not instance of selected constructor`;
    }

    return false; 
  }
  
  return true;
};
