import { validateInput } from './validate-input';
import { Volder } from '../volder';

export const validator = (volderMap, input, collectErrors = true) => {
  const errors = {};
  let validInput = true;

  volderMap.forEach((optionConfigs, optionName) => {
    let validCurInput = true;

    // check if option is required
    if (optionConfigs.required === true && !input.hasOwnProperty(optionName)) {
      if (collectErrors) errors[optionName] = optionConfigs.requiredErrorMessage || `${optionName} is required`;
      validCurInput = false;
    }

    if (input.hasOwnProperty(optionName)) {
      if (optionConfigs.type instanceof Volder) {
        const isObject = typeof input[optionName] === 'object' && !Array.isArray(input[optionName]) && input[optionName] !== null;

        if (isObject) {
          const validationResult = validator(optionConfigs.type.volderMap, input[optionName], collectErrors);

          if (collectErrors && Object.keys(validationResult[1]).length > 0) errors[optionName] = validationResult[1];
          validCurInput = collectErrors ? validationResult[0] : validationResult;
        } else {
          if (collectErrors) errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be an object`;
          validCurInput = false;
        }
      } else validCurInput = validateInput(input, optionName, optionConfigs, errors, collectErrors);

      // validCurInput sometimes equal undefined, so we need to strict equal to false;
      if (validCurInput === false) validInput = false;
    }
  });

  if (collectErrors) return [validInput, errors];
  else return validInput;
};
