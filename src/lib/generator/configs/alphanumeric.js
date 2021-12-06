import { configSpliter } from '../config-spliter';
import { assertType } from '../../utils/assert-type';

export const setupAlphanumericConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('alphanumeric')) {
    if (Array.isArray(optionConfigs.required)) {
      configSpliter('alphanumeric', 'boolean', optionConfigs);
    } else {
      assertType(optionConfigs.required, 'boolean', 'alphanumeric property');
    }
  }
};
