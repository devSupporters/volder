import { stringCase } from './types-validator/string';
import { numberCase } from './types-validator/ number';
import { booleanCase } from './types-validator/boolean';
import { arrayCase } from './types-validator/array';
import { objectCase } from './types-validator/object';
import { nullCase } from './types-validator/null';
import { functionCase } from './types-validator/function';

export const validateInput = (input, optionName, optionConfigs, errors, collectErrors, unclonedInput) => {
  switch (optionConfigs.type) {
    case String:
      return stringCase(input, optionName, optionConfigs, errors, collectErrors);
    case Number:
      return numberCase(input, optionName, optionConfigs, errors, collectErrors);
    case Boolean:
      return booleanCase(input, optionName, optionConfigs, errors, collectErrors);
    case Array:
      return arrayCase(input, optionName, optionConfigs, errors, collectErrors);
    case Object:
      return objectCase(input, optionName, optionConfigs, errors, collectErrors, unclonedInput);
    case null:
      return nullCase(input, optionName, optionConfigs, errors, collectErrors);
    default:
      return functionCase(input, optionName, optionConfigs, errors, collectErrors);
  }
};
