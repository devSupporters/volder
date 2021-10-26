import { configSpliter } from '../config-spliter';
import { assertType } from '../../utils/assert-type';

export const setupRequiredConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('required')) {
    if (Array.isArray(optionConfigs.required)) {
      configSpliter('required', 'boolean', optionConfigs);
    } else {
      assertType(optionConfigs.required, 'boolean', 'required property');
    }
  }
};
