import { configSpliter } from '../config-spliter';
import { assertType } from '../../utils/assert-type';

export const setupMinConfig = (optionConfigs, notNumber = true) => {

  if (optionConfigs.hasOwnProperty('min') || optionConfigs.hasOwnProperty('minLength')) {

    const minValue = notNumber ? optionConfigs.min : optionConfigs.minLength;

    if (Array.isArray(minValue)) {
      configSpliter(notNumber ? 'min' : 'minLength' , 'number', optionConfigs);
    } else {
      assertType(minValue, 'number', notNumber ? 'min property' : 'minLength property');
    }
  }
};
