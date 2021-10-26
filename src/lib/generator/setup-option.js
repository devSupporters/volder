import { assertType } from '../utils/assert-type';
import { configSpliter } from './config-spliter';
import { assertObject } from '../utils/assert-object';
import { Volder } from '../volder';

// configs;
import { setupTypeConfig } from './configs/type';
import { setupRequiredConfig } from './configs/required';
import { setupAvoidConfig } from './configs/avoid';

export const setupOptionWithConfigs = (optionConfigs) => {
  // if option just constructor function | null | function | volder schema
  const types = [null, Boolean, Object, Number, String, Array];

  // if option is just a type;
  if (types.includes(optionConfigs) || typeof optionConfigs === 'function' || optionConfigs instanceof Volder) {
    optionConfigs = { type: optionConfigs };
  } else {
    assertObject(optionConfigs, 'Expected a (object | constructor function | null | volder instance) but received a ');
  }

  setupTypeConfig(optionConfigs);
  setupRequiredConfig(optionConfigs);
  setupAvoidConfig(optionConfigs);

  // avoid this property validators for some types (Boolean | Object | null)
  const avoidedTypes = [Boolean, Object];
  if (avoidedTypes.includes(optionConfigs.type)) {
    // removeing min and max properties from default configuration object
    return optionConfigs;
  }

  if (optionConfigs.hasOwnProperty('trim') && optionConfigs.type === String) {
    assertType(optionConfigs.trim, 'boolean', 'trim property');
  }

  if (optionConfigs.hasOwnProperty('min')) {
    if (Array.isArray(optionConfigs.min)) {
      configSpliter('min', 'number', optionConfigs);
    } else {
      assertType(optionConfigs.min, 'number', 'min property');
    }
  }

  if (optionConfigs.hasOwnProperty('max')) {
    if (Array.isArray(optionConfigs.max)) {
      configSpliter('max', 'number', optionConfigs);
    } else {
      assertType(optionConfigs.max, 'number', 'max property');
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
  return optionConfigs;
};
