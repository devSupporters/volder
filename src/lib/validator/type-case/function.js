import { arrayCase } from './array';
import { stringCase } from './string';
import { numberCase } from './number';

export const functionCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  const isValidType = optionConfigs.type(input[optionName]);

  if (!isValidType) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} is invalid`;
    }

    return false;
  }

  // return a input value to other validator if it match any of it:
  if (input[optionName].constructor.name === 'Array') {
    return arrayCase(input, optionName, optionConfigs, errors, collectErrors);
  } else if (input[optionName].constructor.name === 'String') {
    return stringCase(input, optionName, optionConfigs, errors, collectErrors);
  } else if (input[optionName].constructor.name === 'Number') {
    return numberCase(input, optionName, optionConfigs, errors, collectErrors);
  }

  if (optionConfigs.hasOwnProperty('pattern') && !optionConfigs.pattern(input[optionName])) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.patternErrorMessage || `${optionName} is not in proper pattern`;
    }

    return false;
  }

  return true;
};
