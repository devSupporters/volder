import { assertObject } from '../utils/assert-object';
import { Volder } from '../volder';

// configs;
import { setupTypeConfig } from './configs/type';
import { setupRequiredConfig } from './configs/required';
import { setupAvoidConfig } from './configs/avoid';
import { setupMaxConfig } from './configs/max';
import { setupMinConfig } from './configs/min';

export const setupOptionWithConfigs = (optionConfigs) => {
  // if option just constructor function | null | function | volder schema
  const types = [null, Boolean, Object, Number, String, Array];

  // if option is just a type
  if (types.includes(optionConfigs) || typeof optionConfigs === 'function' || optionConfigs instanceof Volder) {
    optionConfigs = { type: optionConfigs };
  } else {
    assertObject(optionConfigs, 'Expected a (object | constructor function | null | volder instance) but received a ');
  }

  setupTypeConfig(optionConfigs);
  setupRequiredConfig(optionConfigs);

  switch (optionConfigs.type) {
    case Boolean:
      break;
    case Object:
      break;
    case String:
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      break;
    case Number:
      setupMaxConfig(optionConfigs);
      setupMinConfig(optionConfigs);
      break;
    case Array:
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      break;
    case null:
      setupMaxConfig(optionConfigs);
      setupMinConfig(optionConfigs);
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      setupAvoidConfig(optionConfigs);
      break;
    default:
      setupMaxConfig(optionConfigs);
      setupMinConfig(optionConfigs);
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      break;
  }

  // check if min is bigger than max
  if (optionConfigs.hasOwnProperty('min') && optionConfigs.hasOwnProperty('max') && optionConfigs.min > optionConfigs.max) {
    throw Error('min property should be Equal or Smaller than max property');
  }

  // check if minLength is bigger than maxLength
  if (optionConfigs.hasOwnProperty('minLength') && optionConfigs.hasOwnProperty('maxLength') && optionConfigs.minLength > optionConfigs.maxLength) {
    throw Error('minLength property should be Equal or Smaller than maxLength property');
  }

  return optionConfigs;
};
