import { validateMax } from '../configs-validators/max';
import { validateMin } from '../configs-validators/min';
import { validateWhitespace } from '../configs-validators/whitespace';

export const stringCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  const isString = typeof input[optionName] === 'string' || input[optionName] instanceof String;

  if (!isString) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be a string`;
    }

    return false;
  }
  // validate if have no-spaces config;
  if (optionConfigs.hasOwnProperty('trim') && optionConfigs.trim) {
    input[optionName] = input[optionName].trim();

    if (input[optionName].length === 0 && optionConfigs.required === true && optionConfigs.min !== 0) {
      errors[optionName] = optionConfigs.requiredErrorMessage || `${optionName} is required`;

      return false;
    }
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

  if (optionConfigs.hasOwnProperty('whitespace') && !optionConfigs.whitespace && !validateWhitespace(input[optionName])) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.whitespaceErrorMessage || `${optionName} should be without whitespace`;
    }

    return false;
  }

  return true;
};
