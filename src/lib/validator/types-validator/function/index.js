import { arrayCase } from '../array';
import { stringCase } from '../string';
import { numberCase } from '../ number';
import { objectCase } from '../object';
import { booleanCase } from '../boolean';

export const functionCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  const isValidType = optionConfigs.type(input[optionName]);

  if (!isValidType) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} is invalid`;
    }

    return false;
  }

  // return a input value to other validator if it match any of it:

  if (optionConfigs.hasOwnProperty('pattern') && !optionConfigs.pattern(input[optionName])) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.patternErrorMessage || `${optionName} is not in proper pattern`;
    }

    return false;
  }

  if (Array.isArray(input[optionName])) {
    return arrayCase(input, optionName, optionConfigs, errors, collectErrors);
  } else if (typeof input[optionName] === 'string') {
    return stringCase(input, optionName, optionConfigs, errors, collectErrors);
  } else if (typeof input[optionName] === 'number') {
    return numberCase(input, optionName, optionConfigs, errors, collectErrors);
  } else if (typeof input[optionName] === 'object' && !Array.isArray(input[optionName]) && input[optionName] !== null) {
    return objectCase(input, optionName, optionConfigs, errors, collectErrors);
  } else if (typeof input[optionName] === 'boolean') {
    return booleanCase(input, optionName, optionConfigs, errors, collectErrors);
  }

  return true;
};
