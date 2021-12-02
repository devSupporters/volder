import { validateMax } from '../configs-validators/max';
import { validateMin } from '../configs-validators/min';

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

  if (optionConfigs.hasOwnProperty('pattern') && !!optionConfigs.pattern(input[optionName])) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.patternErrorMessage || `${optionName} is not in proper pattern `;
    }

    return false;
  }

  return true;
};
