import { assertObject } from '../utils/assert-object';
import { Volder } from '../volder';
import { strictConfigs } from '../utils/strict-configs';

// configs;
import { setupTypeConfig } from './configs/public/type';
import { setupRequiredConfig } from './configs/public/required';
import { setupPatternConfig } from './configs/public/pattern';
import { setupAvoidConfig } from './configs/null/avoid';
import { setupMaxConfig } from './configs/public/max';
import { setupMinConfig } from './configs/public/min';
import { setupDefaultConfig } from './configs/public/default';
import { setupWhitespaceConfig } from './configs/string/whitespace';
import { setupTransformConfig } from './configs/public/transform';
import { setupAlphanumericConfig } from './configs/string/alphanumeric';
import { setupMatchesConfig } from './configs/string/matches';
import { setupUppercaseConfig, setupLowercaseConfig } from './configs/string/upper-lower';
import { setupIntegerConfig } from './configs/number/integer-float';
import { setupFloatConfig } from './configs/number/integer-float';

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
  const generalConfigs = ['required', 'type', 'default', 'pattern', 'transform'];
  const stringConfigs = ['minLength', 'maxLength', 'trim', 'whitespace', 'alphanumeric', 'matches', 'uppercase', 'lowercase'];
  const arrayConfigs = ['minLength', 'maxLength'];
  const nullConfigs = ['avoid', 'minLength', 'maxLength', 'min', 'max'];
  const numberConfigs = ['min', 'max', 'integer', 'float'];
  const otherConfigs = ['min', 'max', 'minLength', 'maxLength'];

  setupTypeConfig(optionConfigs);
  setupRequiredConfig(optionConfigs);
  setupPatternConfig(optionConfigs);
  setupTransformConfig(optionConfigs);

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
      setupAlphanumericConfig(optionConfigs);
      setupMatchesConfig(optionConfigs);
      setupUppercaseConfig(optionConfigs);
      setupLowercaseConfig(optionConfigs);
      break;
    case Number:
      strictConfigs(optionConfigs, [...numberConfigs, ...generalConfigs]);
      setupMaxConfig(optionConfigs);
      setupMinConfig(optionConfigs);
      setupIntegerConfig(optionConfigs);
      setupDefaultConfig(optionConfigs, Number);
      setupFloatConfig(optionConfigs);
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
    throw new Error('min property should be Equal or Smaller than max property');
  }

  // check if minLength is bigger than maxLength
  if (
    optionConfigs.hasOwnProperty('minLength') &&
    optionConfigs.hasOwnProperty('maxLength') &&
    optionConfigs.minLength > optionConfigs.maxLength
  ) {
    throw new Error('minLength property should be Equal or Smaller than maxLength property');
  }

  // check if has integer and float at the same time
  if (optionConfigs.float && optionConfigs.integer) {
    throw new Error("you can't add { float: true, integer: true } in the same option");
  }

  return optionConfigs;
};
