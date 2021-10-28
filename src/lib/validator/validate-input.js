import { stringCase } from './type-case/string';
import { numberCase } from './type-case/number';
import { booleanCase } from './type-case/boolean';
import { arrayCase } from './type-case/array';
import { objectCase } from './type-case/object';
import { nullCase } from './type-case/null';
import { functionCase } from './type-case/function';

export const validateInput = (input, optionName, optionConfigs, errors, collectErrors) => {
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
      return objectCase(input, optionName, optionConfigs, errors, collectErrors);
    case null:
      return nullCase(input, optionName, optionConfigs, errors, collectErrors);
    default:
      return functionCase(input, optionName, optionConfigs, errors, collectErrors);
  }
};
