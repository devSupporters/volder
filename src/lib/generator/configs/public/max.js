import { configSpliter } from '../../setuption/config-spliter';
import { assertType } from '../../../utils/assert-type';

export const setupMaxConfig = (optionConfigs, isNumberType = true) => {

  if ((optionConfigs.hasOwnProperty('max') && isNumberType) || (optionConfigs.hasOwnProperty('maxLength') && !isNumberType)) {

    const maxValue = isNumberType ? optionConfigs.max : optionConfigs.maxLength;

    if (Array.isArray(maxValue)) {
      configSpliter(isNumberType ? 'max' : 'maxLength', 'number', optionConfigs);
    } else {
      assertType(maxValue, 'number', isNumberType ? 'max property' : 'maxLength property');
    }
  }
};
