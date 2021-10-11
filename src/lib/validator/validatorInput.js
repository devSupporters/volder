import { stringCase } from './typeCases/string';
import { numberCase } from './typeCases/number';
import { booleanCase } from './typeCases/boolean';
import { arrayCase } from './typeCases/array';
import { objectCase } from './typeCases/object';
import { nullCase } from './typeCases/null';
import { functionCase } from './typeCases/function'

export const validatorInput = (input, optionName, optionConfigs, errors) => {
  switch (optionConfigs.type) {
    case String:
      return stringCase(input, optionName, optionConfigs, errors);
    case Number:
      return numberCase(input, optionName, optionConfigs, errors);
    case Boolean:
      return booleanCase(input, optionName, optionConfigs, errors);
    case Array:
      return arrayCase(input, optionName, optionConfigs, errors);
    case Object:
      return objectCase(input, optionName, optionConfigs, errors);
    case null:
      return nullCase(input, optionName, optionConfigs, errors);
    default:
      return functionCase(input, optionName, optionConfigs, errors);
  }
};
