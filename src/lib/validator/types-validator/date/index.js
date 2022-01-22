import { isValidDate } from '../../../utils/is-valid-date';

export const dateCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  // check if it valid date
  if (Array.isArray(input[optionName])) input[optionName] = input[optionName].join('/');

  if (!isValidDate(input[optionName])) {
    if (collectErrors) {
      errors[optionName] =
        optionConfigs.typeErrorMessage || `${optionName} is not valid date, date should be in 'mm/dd/yyyy' format`;
    }

    return false;
  }
};
