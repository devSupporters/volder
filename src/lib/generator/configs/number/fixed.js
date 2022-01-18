import { assertType } from '../../../utils/assert-type';

export const setupFixedConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('fixed')) {
    assertType(optionConfigs.fixed, 'number', 'fixed property');
  }
};
