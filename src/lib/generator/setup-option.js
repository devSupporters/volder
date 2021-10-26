import { assertType } from '../utils/assert-type';
import { configSpliter } from './config-spliter';
import { assertObject } from '../utils/assert-object';
import { isValidType } from '../utils/is-valid-type';
import { Volder } from '../volder';

export const setUpOptionWithConfigs = (optionConfigs) => {
  // if option just constructor function | null | function | volder schema
  const types = [null, Boolean, Object, Number, String, Array];

  // if option is just a type;
  if (types.includes(optionConfigs) || typeof optionConfigs === 'function' || optionConfigs instanceof Volder) {
    optionConfigs = { type: optionConfigs };
  } else {
    assertObject(optionConfigs, 'Expected a (object | constructor function | null | volder instance) but received a ');
  }

  if (optionConfigs.hasOwnProperty('type')) {
    Array.isArray(optionConfigs.type) && configSpliter('type', 'constructor-type', optionConfigs);
    isValidType(optionConfigs.type);
  } else {
    throw new Error('type property is required');
  }

  if (optionConfigs.hasOwnProperty('required')) {
    if (Array.isArray(optionConfigs.required)) {
      configSpliter('required', 'boolean', optionConfigs);
    } else {
      assertType(optionConfigs.required, 'boolean', 'required property');
    }
  }

  if (optionConfigs.hasOwnProperty('avoid') && optionConfigs.type === null) {
    const allowedTypes = [String, Object, Array, Number, Boolean];
    if (!Array.isArray(optionConfigs.avoid)) {
      throw new TypeError('avoid property should be an array');
    }

    optionConfigs.avoid.forEach((type) => {
      if (!allowedTypes.includes(type)) {
        throw new TypeError(
          `Expected this types (String | Object | Array | Number | Boolean) but received type ${typeof type} which ${type}`
        );
      }
    });
  }

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
