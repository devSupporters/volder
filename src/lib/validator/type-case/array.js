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

  if (optionConfigs.hasOwnProperty('min') && !validateMin(input[optionName].length, optionConfigs.min)) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.minErrorMessage || `${optionName} should be at least ${optionConfigs.min} items`;
    }
    
    return false;
  }
  
  if (optionConfigs.hasOwnProperty('max') && !validateMax(input[optionName].length, optionConfigs.max)) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.maxErrorMessage || `${optionName} should be at most ${optionConfigs.max} items`;
    }

    return false;
  }
};
