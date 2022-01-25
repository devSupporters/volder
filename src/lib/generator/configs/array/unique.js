import { configSpliter } from '../../setuption/config-spliter';
import { assertType } from '../../../utils/assert-type';

export const setupUniqueConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('unique')) {
    if (Array.isArray(optionConfigs.unique)) {
      configSpliter('unique', 'boolean', optionConfigs);
    } else {
      assertType(optionConfigs.unique, 'boolean', 'unique property');
    }
  }
};
