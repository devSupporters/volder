import { assertObject } from '../../utils/assert-object';
import { Volder } from '../../volder';
import { strictConfigs } from '../../utils/strict-configs';
import { conflictsChecker } from './conflicts-checker';

// configs;
import { setupTypeConfig } from '../configs/public/type';
import { setupRequiredConfig } from '../configs/public/required';
import { setupPatternConfig } from '../configs/public/pattern';
import { setupAvoidConfig } from '../configs/null/avoid';
import { setupMaxConfig } from '../configs/public/max';
import { setupMinConfig } from '../configs/public/min';
import { setupDefaultConfig } from '../configs/public/default';
import { setupWhitespaceConfig } from '../configs/string/whitespace';
import { setupTransformConfig } from '../configs/public/transform';
import { setupAlphanumericConfig } from '../configs/string/alphanumeric';
import { setupMatchesConfig } from '../configs/string/matches';
import { setupUppercaseConfig, setupLowercaseConfig } from '../configs/string/upper-lower';
import { setupIntegerConfig } from '../configs/number/integer-float';
import { setupFloatConfig } from '../configs/number/integer-float';
import { setupRoundConfig } from '../configs/number/round';
import { setupFixedConfig } from '../configs/number/fixed';
import { setupSignConfig } from '../configs/number/sign';
import { setupSensibleConfig } from '../configs/boolean/sensible';
import { setupStateConfig } from '../configs/boolean/state';
import { setupSwitchConfig } from '../configs/boolean/switch';
import { setupArrayOfConfig } from '../configs/array/arrayof';
import { setupUniqueConfig } from '../configs/array/unique';
import { setupInstanceConfig } from '../configs/object/instance';
import { setupWithConfig, setupWithoutConfig, setupStrictConfig } from '../configs/object/with-without-strict';

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
  const generalConfigsKeys = ['required', 'type', 'default', 'pattern', 'transform'];
  const stringConfigsKeys = ['minLength', 'maxLength', 'trim', 'whitespace', 'alphanumeric', 'matches', 'uppercase', 'lowercase'];
  const arrayConfigsKeys = ['minLength', 'maxLength', 'arrayOf', 'unique'];
  const nullConfigsKeys = ['avoid', 'minLength', 'maxLength', 'min', 'max'];
  const numberConfigsKeys = ['min', 'max', 'integer', 'float', 'round', 'fixed', 'sign'];
  const booleanConfigsKeys = ['sensible', 'state', 'switch'];
  const objectConfigsKeys = ['instance', 'with', 'without', 'strict'];
  const otherConfigsKeys = ['min', 'max', 'minLength', 'maxLength'];

  setupTypeConfig(optionConfigs);
  setupRequiredConfig(optionConfigs);
  setupPatternConfig(optionConfigs);
  setupTransformConfig(optionConfigs);

  switch (optionConfigs.type) {
    case Boolean:
      strictConfigs(optionConfigs, [...booleanConfigsKeys, ...generalConfigsKeys]);
      setupDefaultConfig(optionConfigs, Boolean);
      setupSensibleConfig(optionConfigs);
      setupStateConfig(optionConfigs);
      setupSwitchConfig(optionConfigs);
      break;
    case Object:
      strictConfigs(optionConfigs, [...objectConfigsKeys, ...generalConfigsKeys]);
      setupDefaultConfig(optionConfigs, Object);
      setupInstanceConfig(optionConfigs);
      setupWithConfig(optionConfigs);
      setupWithoutConfig(optionConfigs);
      setupStrictConfig(optionConfigs);
      break;
    case String:
      strictConfigs(optionConfigs, [...stringConfigsKeys, ...generalConfigsKeys]);
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
      strictConfigs(optionConfigs, [...numberConfigsKeys, ...generalConfigsKeys]);
      setupMaxConfig(optionConfigs);
      setupMinConfig(optionConfigs);
      setupIntegerConfig(optionConfigs);
      setupDefaultConfig(optionConfigs, Number);
      setupFloatConfig(optionConfigs);
      setupRoundConfig(optionConfigs);
      setupFixedConfig(optionConfigs);
      setupSignConfig(optionConfigs);
      break;
    case Array:
      strictConfigs(optionConfigs, [...arrayConfigsKeys, ...generalConfigsKeys]);
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      setupDefaultConfig(optionConfigs, Array);
      setupArrayOfConfig(optionConfigs);
      setupUniqueConfig(optionConfigs);
      break;
    case null:
      strictConfigs(optionConfigs, [...nullConfigsKeys, ...generalConfigsKeys]);
      setupMaxConfig(optionConfigs);
      setupMinConfig(optionConfigs);
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      setupAvoidConfig(optionConfigs);
      setupDefaultConfig(optionConfigs, null);
      break;
    default:
      strictConfigs(optionConfigs, [...otherConfigsKeys, ...generalConfigsKeys]);
      setupMaxConfig(optionConfigs);
      setupMinConfig(optionConfigs);
      setupMaxConfig(optionConfigs, false);
      setupMinConfig(optionConfigs, false);
      setupDefaultConfig(optionConfigs, null);
      break;
  }

  conflictsChecker(optionConfigs);

  return optionConfigs;
};
