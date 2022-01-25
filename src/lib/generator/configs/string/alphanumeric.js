import { configSpliter } from '../../setuption/config-spliter';
import { assertType } from '../../../utils/assert-type';

export const setupAlphanumericConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('alphanumeric')) {
    if (Array.isArray(optionConfigs.alphanumeric)) {
      configSpliter('alphanumeric', 'boolean', optionConfigs);
    } else {
      assertType(optionConfigs.alphanumeric, 'boolean', 'alphanumeric property');
    }
  }
};
