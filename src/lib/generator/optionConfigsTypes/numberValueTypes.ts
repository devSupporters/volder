import { configSpliter } from '../configSpliter';
import { assertType } from '../../utils/assertType';

// number value types stand for type have number value like (array is have a length property)
export const numberValueTypesCase = (optionConfigs: any, defaultConfiguredOption: any) => {
  if (optionConfigs.hasOwnProperty('min')) {
    if (Array.isArray(optionConfigs.min)) {
      configSpliter('min', 'number', optionConfigs, defaultConfiguredOption);
    } else {
      assertType(optionConfigs.min, 'number', 'min property');
      defaultConfiguredOption.min = optionConfigs.min;
    }
  }

  if (optionConfigs.hasOwnProperty('max')) {
    if (Array.isArray(optionConfigs.max)) {
      configSpliter('max', 'number', optionConfigs, defaultConfiguredOption);
    } else {
      assertType(optionConfigs.max, 'number', 'max property');
      defaultConfiguredOption.max = optionConfigs.max;
    }
  }

  // check if min is smaller than max
  if (
    optionConfigs.hasOwnProperty('min') &&
    optionConfigs.hasOwnProperty('max') &&
    optionConfigs.min > optionConfigs.max
  ) {
    throw Error('min property should be Equal or Smaller than max property');
  }
  return defaultConfiguredOption;
};
