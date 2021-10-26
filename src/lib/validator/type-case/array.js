import { validateMax } from '../configs/max';
import { validateMin } from '../configs/min';

export const arrayCase = (input, optionName, optionConfigs, errors) => {
  const isArray = Array.isArray(input[optionName]);

  if (!isArray) {
    errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be an array`;
    return false;
  }

  if (optionConfigs.hasOwnProperty('min') && !validateMin(input[optionName].length, optionConfigs.min)) {
    errors[optionName] = optionConfigs.minErrorMessage || `${optionName} should be at least ${optionConfigs.min} items`;
    return false;
  }

  if (optionConfigs.hasOwnProperty('max') && !validateMax(input[optionName].length, optionConfigs.max)) {
    errors[optionName] = optionConfigs.maxErrorMessage || `${optionName} should be at most ${optionConfigs.max} items`;
    return false;
  }
};