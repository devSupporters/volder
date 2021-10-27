import { validatorInput } from './validator-input';
import { Volder } from '../volder';

export const validator = (volderMap, input) => {
  const errors = {};
  let validInput = true;

  volderMap.forEach((optionConfigs, optionName) => {
    // check if option is required
    if (optionConfigs.required === true && !input.hasOwnProperty(optionName)) {
      errors[optionName] = optionConfigs.requiredErrorMessage || `${optionName} is required`;
      validInput = validInput && false;
    }

    if (input.hasOwnProperty(optionName)) {
      if (optionConfigs.type instanceof Volder) {
        const isObject =
          typeof input[optionName] === 'object' && !Array.isArray(input[optionName]) && input[optionName] !== null;

        if (isObject) {
          const [validCurInput, SchemaErrors] = validator(optionConfigs.type.volderMap, input[optionName]);
          if (Object.keys(SchemaErrors).length > 0) errors[optionName] = SchemaErrors;
          if (validCurInput === false) validInput = false;
        } else {
          errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be an object`;
          validInput = validInput && false;
        }
      } else {
        const validCurInput = validatorInput(input, optionName, optionConfigs, errors);
        if (validCurInput === false) validInput = false;
      }
    }
  });

  return [validInput, errors];
};
