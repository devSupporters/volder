import { configSpliter } from '../config-spliter';
import { assertType } from '../../utils/assert-type';

export const setupRequiredConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('required')) {
    if (optionConfigs.hasOwnProperty('default') && optionConfigs.required) {
      throw new Error("you can't set { required: true } and use default key at the same time");
    }
    if (Array.isArray(optionConfigs.required)) {
      configSpliter('required', 'boolean', optionConfigs);
    } else {
      assertType(optionConfigs.required, 'boolean', 'required property');
    }
  }
};
