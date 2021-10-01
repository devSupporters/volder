import { stringCase } from './typeCasesValidators/string';
import { numberCase } from './typeCasesValidators/number';
import { booleanCase } from './typeCasesValidators/boolean';

export const validatorInput = (input: any, optionName: string, optionConfigs: any, errors: any) => {
  switch (optionConfigs.type) {
    case String:
      return stringCase(input, optionName, optionConfigs, errors);
    case Number:
      return numberCase(input, optionName, optionConfigs, errors);
    case Boolean:
      return booleanCase(input, optionName, errors);
    // case Array:
    // case Object:
  }
};
