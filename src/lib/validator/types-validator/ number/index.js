import { validateMax } from '../public/max';
import { validateMin } from '../public/min';

export const numberCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  const isNumber = typeof input[optionName] === 'number' || input[optionName] instanceof Number;

  if (!isNumber) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be a number`;
    }
    return false;
  }

  if (optionConfigs.hasOwnProperty('min') && !validateMin(input[optionName], optionConfigs.min)) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.minErrorMessage || `${optionName} should be at least ${optionConfigs.min}`;
    }
    return false;
  }

  if (optionConfigs.hasOwnProperty('max') && !validateMax(input[optionName], optionConfigs.max)) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.maxErrorMessage || `${optionName} should be at most ${optionConfigs.max}`;
    }
    return false;
  }

  return true;
};
