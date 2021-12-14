import { configSpliter } from '../config-spliter';
import { assertType } from '../../utils/assert-type';

export const setupUppercaseConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('uppercase')) {
    if (Array.isArray(optionConfigs.uppercase)) {
      configSpliter('uppercase', 'boolean', optionConfigs);
    } else {
      assertType(optionConfigs.uppercase, 'boolean', 'uppercase property');
    }
  }
};

export const setupLowercaseConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('lowercase')) {
    if (Array.isArray(optionConfigs.lowercase)) {
      configSpliter('lowercase', 'boolean', optionConfigs);
    } else {
      assertType(optionConfigs.lowercase, 'boolean', 'lowercase property');
    }
  }
};
