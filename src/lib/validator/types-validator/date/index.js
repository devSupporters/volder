import { isValidDate } from '../../../utils/is-valid-date';

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

  return true;
};
