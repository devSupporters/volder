import { configSpliter } from '../../setuption/config-spliter';
import { assertType } from '../../../utils/assert-type';

export const setupIntegerConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('integer')) {
    if (Array.isArray(optionConfigs.integer)) {
      configSpliter('integer', 'boolean', optionConfigs);
    } else {
      assertType(optionConfigs.integer, 'boolean', 'integer property');
    }
  }
};

export const setupFloatConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('float')) {
    if (Array.isArray(optionConfigs.float)) {
      configSpliter('float', 'boolean', optionConfigs);
    } else {
      assertType(optionConfigs.float, 'boolean', 'float property');
    }
  }
};