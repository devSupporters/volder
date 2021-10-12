import { arrayCase } from './array';
import { stringCase } from './string';
import { numberCase } from './number';

export const nullCase = (input, optionName, optionConfigs, errors) => {
  if (optionConfigs.hasOwnProperty('avoid')) {
    // extract input option name type
    const typeOfInput = typeof input[optionName];
    const inputConstructorFunction =
      typeOfInput === 'string'
        ? String
        : typeOfInput === 'number'
        ? Number
        : typeOfInput === 'boolean'
        ? Boolean
        : typeOfInput === 'object' && Array.isArray(input[optionName])
        ? Array
        : Object;
    if (optionConfigs.avoid.includes(inputConstructorFunction)) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${inputConstructorFunction.name} type not allowed`;
      return false;
    }
  }
  if (input[optionName].constructor.name === 'Array') {
    return arrayCase(input, optionName, optionConfigs, errors);
  } else if (input[optionName].constructor.name === 'String') {
    return stringCase(input, optionName, optionConfigs, errors);
  } else if (input[optionName].constructor.name === 'Number') {
    return numberCase(input, optionName, optionConfigs, errors);
  }
};
