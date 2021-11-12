import { configSpliter } from '../config-spliter';
import { assertType } from '../../utils/assert-type';

export const setupMinConfig = (optionConfigs, isNumberType = true) => {

  if ((optionConfigs.hasOwnProperty('min') && isNumberType) || (optionConfigs.hasOwnProperty('minLength') && !isNumberType)) {

    // check if minLength < 0
    if((optionConfigs.minLength < 0 && !isNumberType)) {
      throw new Error('minLength property should be at least equal 0 but received ' + optionConfigs.minLength);
    }
    
    const minValue = isNumberType ? optionConfigs.min : optionConfigs.minLength;

    if (Array.isArray(minValue)) {
      configSpliter(isNumberType ? 'min' : 'minLength', 'number', optionConfigs);
    } else {
      assertType(minValue, 'number', isNumberType ? 'min property' : 'minLength property');
    }
  }
};
