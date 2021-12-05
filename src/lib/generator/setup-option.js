import { assertObject } from '../utils/assert-object';
import { Volder } from '../volder';
import { strictConfigs } from '../utils/strict-configs';

// configs;
import { setupTypeConfig } from './configs/type';
import { setupRequiredConfig } from './configs/required';
import { setupPatternConfig } from './configs/pattern';
import { setupAvoidConfig } from './configs/avoid';
import { setupMaxConfig } from './configs/max';
import { setupMinConfig } from './configs/min';
import { setupDefaultConfig } from './configs/default';
import { setupWhitespaceConfig } from './configs/whitespace';
// import transfomr

export const setupOptionWithConfigs = (optionConfigs) => {
  // if option just constructor function | null | function | volder schema
  const types = [null, Boolean, Object, Number, String, Array];

  // if option is just a type
  if (types.includes(optionConfigs) || typeof optionConfigs === 'function' || optionConfigs instanceof Volder) {
    optionConfigs = { type: optionConfigs };
  } else {
    assertObject(optionConfigs, 'Expected a (object | constructor function | null | volder instance) but received a ');
  }

  // add a default config to the general configs;
  const generalConfigs = ['required', 'type', 'default', 'pattern']; // add transform
  const stringConfigs = ['minLength', 'maxLength', 'trim', 'whitespace'];
  const arrayConfigs = ['minLength', 'maxLength'];
  const nullConfigs = ['avoid', 'minLength', 'maxLength', 'min', 'max'];
  const numberConfigs = ['min', 'max'];
  const otherConfigs = ['min', 'max', 'minLength', 'maxLength'];

  setupTypeConfig(optionConfigs);
  setupRequiredConfig(optionConfigs);
  setupPatternConfig(optionConfigs);
  // add transform setup fucntion
  switch (optionConfigs.type) {
    case Boolean:
      strictConfigs(optionConfigs, [...generalConfigs]);
      setupDefaultConfig(optionConfigs, Boolean);
      break;
    case Object:
      strictConfigs(optionConfigs, [...generalConfigs]);
      setupDefaultConfig(optionConfigs, Object);
      break;
    case String:
      strictConfigs(optionConfigs, [...stringConfigs, ...generalConfigs]);
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      setupDefaultConfig(optionConfigs, String);
      setupWhitespaceConfig(optionConfigs);
      break;
    case Number:
      strictConfigs(optionConfigs, [...numberConfigs, ...generalConfigs]);
      setupMaxConfig(optionConfigs);
      setupMinConfig(optionConfigs);
      setupDefaultConfig(optionConfigs, Number);
      break;
    case Array:
      strictConfigs(optionConfigs, [...arrayConfigs, ...generalConfigs]);
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      setupDefaultConfig(optionConfigs, Array);
      break;
    case null:
      strictConfigs(optionConfigs, [...nullConfigs, ...generalConfigs]);
      setupMaxConfig(optionConfigs);
      setupMinConfig(optionConfigs);
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      setupAvoidConfig(optionConfigs);
      setupDefaultConfig(optionConfigs, null);
      break;
    default:
      strictConfigs(optionConfigs, [...otherConfigs, ...generalConfigs]);
      setupMaxConfig(optionConfigs);
      setupMinConfig(optionConfigs);
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      setupDefaultConfig(optionConfigs, null);
      break;
  }

  // check if min is bigger than max
  if (optionConfigs.hasOwnProperty('min') && optionConfigs.hasOwnProperty('max') && optionConfigs.min > optionConfigs.max) {
    throw Error('min property should be Equal or Smaller than max property');
  }

  // check if minLength is bigger than maxLength
  if (
    optionConfigs.hasOwnProperty('minLength') &&
    optionConfigs.hasOwnProperty('maxLength') &&
    optionConfigs.minLength > optionConfigs.maxLength
  ) {
    throw Error('minLength property should be Equal or Smaller than maxLength property');
  }

  return optionConfigs;
};
