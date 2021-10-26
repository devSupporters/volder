import { arrayCase } from './array';
import { stringCase } from './string';
import { numberCase } from './number';

export const functionCase = (input, optionName, optionConfigs, errors) => {
  const isValidType = optionConfigs.type(input[optionName]);

  if (typeof isValidType !== 'boolean')
    throw new Error(`Expect custom function return boolean but received ${typeof input[optionName]} at ${optionName}`);
  if (!isValidType) {
    errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} is invalid`;
    return false;
  }

  if (input[optionName].constructor.name === 'Array') {
    return arrayCase(input, optionName, optionConfigs, errors);
  } else if (input[optionName].constructor.name === 'String') {
    return stringCase(input, optionName, optionConfigs, errors);
  } else if (input[optionName].constructor.name === 'Number') {
    return numberCase(input, optionName, optionConfigs, errors);
  }
};
