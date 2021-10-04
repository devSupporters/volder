import { min, max, required, trim } from './defaultValues';
import { assertType } from '../utils/assertType';
import { configSpliter } from './configSpliter';

export const setUpOptionWithConfigs = (optionConfigs: any) => {
  const defaultConfiguredOption: any = { min, max, type: optionConfigs.type, required };

  if (optionConfigs.hasOwnProperty('required')) {
    if (Array.isArray(optionConfigs.required)) {
      configSpliter('required', 'boolean', optionConfigs, defaultConfiguredOption);
    } else {
      assertType(optionConfigs.required, 'boolean', 'required property'); 
      defaultConfiguredOption.required = optionConfigs.required;
    }
  }

  if (optionConfigs.hasOwnProperty('avoid') && optionConfigs.type === null) {
    const allowedTypes = [String, Object, Array, Number, Boolean];
    if (!Array.isArray(optionConfigs.avoid)) {
      throw new TypeError('avoid property should be an array');
    }

    optionConfigs.avoid.forEach((type: any) => {
      if (!allowedTypes.includes(type)) {
        throw new TypeError(
          `Expected this types (String | Object | Array | Number | Boolean) but received type ${typeof type} which ${type}`
        );
      }
    });
    if (optionConfigs.avoid.length >= 1) {
      defaultConfiguredOption.avoid = optionConfigs.avoid;
    }
  }

  // avoid this property validators for some types (Boolean | Object | null)
  const avoidedTypes = [Boolean, Object, null];
  if (avoidedTypes.includes(optionConfigs.type)) {
    // removeing min and max properties from default configuration object
    const { min, max, ...newDefaultConfigOption } = defaultConfiguredOption;
    return newDefaultConfigOption;
  }

  if (optionConfigs.hasOwnProperty('trim') && optionConfigs.type === String) {
    assertType(optionConfigs.trim, 'boolean', 'trim property');
    defaultConfiguredOption.trim = optionConfigs.trim;
  } else if (optionConfigs.type === String) defaultConfiguredOption.trim = trim;

  if (optionConfigs.hasOwnProperty('min')) {
    assertType(optionConfigs.min, 'number', 'min property');
    defaultConfiguredOption.min = optionConfigs.min;
  }

  if (optionConfigs.hasOwnProperty('max')) {
    assertType(optionConfigs.max, 'number', 'max property');
    defaultConfiguredOption.max = optionConfigs.max;
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
