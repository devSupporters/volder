import { stringCase } from './typeCases/string';
import { numberCase } from './typeCases/number';
import { booleanCase } from './typeCases/boolean';
import { arrayCase } from './typeCases/array';
import { objectCase } from './typeCases/object';
import { nullCase } from './typeCases/null';

export const validatorInput = (input: any, optionName: string, optionConfigs: any, errors: any) => {
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
      return objectCase(input, optionName,optionConfigs, errors);
    case null:
      return nullCase(input, optionName, optionConfigs, errors);
  }
};
