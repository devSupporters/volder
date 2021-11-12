import { configSpliter } from '../config-spliter';
import { assertType } from '../../utils/assert-type';

export const setupMaxConfig = (optionConfigs, isNumber = true) => {

  if ((optionConfigs.hasOwnProperty('max') && isNumber) || (optionConfigs.hasOwnProperty('maxLength') && !isNumber)) {

    const maxValue = isNumber ? optionConfigs.max : optionConfigs.maxLength;
    
    if (Array.isArray(maxValue)) {
      configSpliter(isNumber ? 'max' : 'maxLength', 'number', optionConfigs);
    } else {
      assertType(maxValue, 'number', isNumber ? 'max property' : 'maxLength property');
    }
  }
};
