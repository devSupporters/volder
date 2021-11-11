import { configSpliter } from '../config-spliter';
import { assertType } from '../../utils/assert-type';

export const setupMinConfig = (optionConfigs, isNumber = true) => {

  if (optionConfigs.hasOwnProperty('min') || optionConfigs.hasOwnProperty('minLength')) {

    const minValue = isNumber ? optionConfigs.min : optionConfigs.minLength;

    if (Array.isArray(minValue)) {
      configSpliter(isNumber ? 'min' : 'minLength' , 'number', optionConfigs);
    } else {
      assertType(minValue, 'number', isNumber ? 'min property' : 'minLength property');
    }
  }
};
