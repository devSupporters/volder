import { validateMax } from '../public/max';
import { validateMin } from '../public/min';
import { validateArrayOf } from './arrayOf';

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
      errors[optionName] =
        optionConfigs.minLengthErrorMessage || `${optionName} should be at least ${optionConfigs.minLength} length`;
    }

    return false;
  }

  if (optionConfigs.hasOwnProperty('maxLength') && !validateMax(input[optionName].length, optionConfigs.maxLength)) {
    if (collectErrors) {
      errors[optionName] =
        optionConfigs.maxLengthErrorMessage || `${optionName} should be at most ${optionConfigs.maxLength} length`;
    }

    return false;
  }

  if (optionConfigs.hasOwnProperty('arrayOf') && !validateArrayOf(input[optionName], optionConfigs.arrayOf)) {
    if (collectErrors) {
      errors[optionName] =
        optionConfigs.arrayOfErrorMessage || `${optionName} is not accpted type depening in arrayOf config`;
    }

    return false;
  }

  return true;
};
