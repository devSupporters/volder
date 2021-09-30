import { stringCase } from './typeCasesValidators/string';
import { numberCase } from './typeCasesValidators/number';
export const validatorInput = (input: any, optionName: string, optionConfigs: any, errors: any) => {
  switch (optionConfigs.type) {
    case String:
      return stringCase(input, optionName, optionConfigs, errors);
    case Number:
      return numberCase(input, optionName, optionConfigs, errors);
    // case Boolean:
    // case Array:
    // case Object:
  }
};
