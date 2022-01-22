import { isValidDate } from '../../../utils/is-valid-date';
import { validateAfter, validateBefore } from './before-after';

export const dateCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  // check if it valid date
  let curInput = input[optionName];
  if (Array.isArray(curInput)) curInput = curInput.join('/');

  if (!isValidDate(curInput)) {
    if (collectErrors) {
      errors[optionName] =
        optionConfigs.typeErrorMessage || `${optionName} is not valid date, date should be in 'mm/dd/yyyy' format`;
    }

    return false;
  }

  if (optionConfigs.hasOwnProperty('after') && !validateAfter(input[optionName])) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.afterErrorMessage || `${optionName} is not after the entered date`;
    }

    return false;
  }

  if (optionConfigs.hasOwnProperty('before') && !validateBefore(input[optionName])) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.beforeErrorMessage || `${optionName} is not before the entered date`;
    }

    return false;
  }

  return true;
};
