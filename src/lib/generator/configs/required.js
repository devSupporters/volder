import { configSpliter } from '../config-spliter';
import { assertType } from '../../utils/assert-type';

export const setupRequiredConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('required')) {
    // if(optionConfigs.hasOwnProperty('default')) {
    //   throw new Error("you can't use { required and default } keys at same option");
    // }
    if (Array.isArray(optionConfigs.required)) {
      configSpliter('required', 'boolean', optionConfigs);
    } else {
      assertType(optionConfigs.required, 'boolean', 'required property');
    }
  }
};
