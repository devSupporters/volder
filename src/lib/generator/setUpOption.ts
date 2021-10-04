import { min, max, required } from './defaultValues';
import { assertType } from '../utils/assertType';
import { configSpliter } from './configSpliter';
import { assertConstructorFunction } from '../utils/assertConstructorFunction';
import { nullTypeCase } from './optionConfigsTypes/null';
import { noneNumberValueTypesCase } from './optionConfigsTypes/noneNumberValueTypes';
// import { stringTypeCase } from './optionConfigsTypes/string';
// import { numberValueTypesCase } from './optionConfigsTypes/numberValueTypes';

export const setUpOptionWithConfigs = (optionConfigs: any) => {
  const defaultConfiguredOption: any = { min, max, required };

  if (optionConfigs.hasOwnProperty('type')) {
    if (Array.isArray(optionConfigs.type)) {
      configSpliter('type', 'constructor-type', optionConfigs, defaultConfiguredOption);
    } else if (optionConfigs.type !== null) {
      assertConstructorFunction(optionConfigs.type);
      defaultConfiguredOption.type = optionConfigs.type;
    } else defaultConfiguredOption.type = optionConfigs.type;
  } else {
    throw new Error('type property is required');
  }

  if (optionConfigs.hasOwnProperty('required')) {
    if (Array.isArray(optionConfigs.required)) {
      configSpliter('required', 'boolean', optionConfigs, defaultConfiguredOption);
    } else {
      assertType(optionConfigs.required, 'boolean', 'required property');
      defaultConfiguredOption.required = optionConfigs.required;
    }
  }

  switch (optionConfigs.type) {
    case null:
    case Object:
    case Boolean:
      optionConfigs.type === null && nullTypeCase(optionConfigs, defaultConfiguredOption);
      return noneNumberValueTypesCase(defaultConfiguredOption);
    // case String:
    // case Array:
    // case Number:
    //   optionConfigs.type == String && stringTypeCase(optionConfigs, defaultConfiguredOption);
    //   numberValueTypesCase(optionConfigs, defaultConfiguredOption);
  }

  if (optionConfigs.hasOwnProperty('trim') && optionConfigs.type === String) {
    assertType(optionConfigs.trim, 'boolean', 'trim property');
    defaultConfiguredOption.trim = optionConfigs.trim;
  } else if (optionConfigs.type === String) defaultConfiguredOption.trim = false;

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
