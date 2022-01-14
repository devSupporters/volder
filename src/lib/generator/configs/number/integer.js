import { configSpliter } from '../../config-spliter';
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