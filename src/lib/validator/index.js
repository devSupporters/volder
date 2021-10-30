import { validateInput } from './validate-input';
import { Volder } from '../volder';
import { deepClone } from '../utils/deepClone';

export const validator = (volderMap, input, collectErrors = true) => {
  const clonedInput = deepClone(input);
  const errors = {};
  let valid = true;

  volderMap.forEach((optionConfigs, optionName) => {
    let validCurInput = true;

    // check if option is required
    if (optionConfigs.required === true && !clonedInput.hasOwnProperty(optionName)) {
      if (collectErrors) errors[optionName] = optionConfigs.requiredErrorMessage || `${optionName} is required`;
      validCurInput = false;
    } else if (clonedInput.hasOwnProperty(optionName)) {
      if (optionConfigs.type instanceof Volder) {
        const isObject =
          typeof clonedInput[optionName] === 'object' &&
          !Array.isArray(clonedInput[optionName]) &&
          clonedInput[optionName] !== null;

        if (isObject) {
          const validationResult = validator(optionConfigs.type.volderMap, clonedInput[optionName], collectErrors);

          validCurInput = collectErrors ? validationResult.valid : validationResult;

          if (collectErrors && Object.keys(validationResult.errors).length > 0) errors[optionName] = validationResult.errors;
        } else {
          if (collectErrors) errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be an object`;
          validCurInput = false;
        }
      } else validCurInput = validateInput(clonedInput, optionName, optionConfigs, errors, collectErrors);
    }
    // validCurInput sometimes equal undefined, so we need to strict equal to false;
    if (!validCurInput) valid = false;
  });

  if (collectErrors) return { valid, errors, value: clonedInput };
  else return valid;
};
