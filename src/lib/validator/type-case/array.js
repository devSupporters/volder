import { validateMax } from '../configs-validators/max';
import { validateMin } from '../configs-validators/min';

export const arrayCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  const isArray = Array.isArray(input[optionName]);

  if (!isArray) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be an array`;
    }

    return false;
  }

  if (optionConfigs.hasOwnProperty('minLength') && !validateMin(input[optionName].length, optionConfigs.minLength)) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.minLengthErrorMessage || `${optionName} should be at least ${optionConfigs.minLength} length`;
    }
    
    return false;
  }
  
  if (optionConfigs.hasOwnProperty('maxLength') && !validateMax(input[optionName].length, optionConfigs.maxLength)) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.maxLengthErrorMessage || `${optionName} should be at most ${optionConfigs.maxLength} length`;
    }

    return false;
  }
  return true;
};
