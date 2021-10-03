import { min, max, required, trim } from './defaultValues';
import { assertType } from '../utils/assertType';

const minProp: string = 'min';
const maxProp: string = 'max';
const requiredProp: string = 'required';
const typeProp: string = 'type';
const trimProp: string = 'trim';
const avoidProp: string = 'avoid';

export const setUpOptionWithConfigs = (optionConfigs: any) => {
  const defaultConfiguredOption: any = { min, max, type: optionConfigs[typeProp], required };
  // check if min is smaller than max
  if (
    optionConfigs.hasOwnProperty(minProp) &&
    optionConfigs.hasOwnProperty(maxProp) &&
    optionConfigs[minProp] >= optionConfigs[maxProp]
  )
    throw Error('min property should be smaller than max property');

  if (optionConfigs.hasOwnProperty(requiredProp)) {
    assertType(optionConfigs[requiredProp], 'boolean', `${requiredProp} property`);
    defaultConfiguredOption.required = optionConfigs[requiredProp];
  }

  if (optionConfigs.hasOwnProperty(avoidProp) && optionConfigs[typeProp] === null) {
    const allowedTypes = [String, Object, Array, Number, Boolean];
    if (!Array.isArray(optionConfigs[avoidProp])) {
      throw new TypeError(`avoid property should be an array at ${optionConfigs} option`);
    }

    optionConfigs[avoidProp].forEach((type: any) => {
      if (!allowedTypes.includes(type)) {
        throw new TypeError(
          `Expected this types (String | Object | Array | Number | Boolean) but received ${type} at ${optionConfigs} option`
        );
      }
    });

    defaultConfiguredOption[avoidProp] = optionConfigs[avoidProp];
  }

  // avoid this property validators for some types (Boolean | Object | null)
  const avoidedTypes = [Boolean, Object, null];
  if (avoidedTypes.includes(optionConfigs[typeProp])) {
    // removeing min and max properties from default configuration object
    const { min, max, ...newDefaultConfigOption } = defaultConfiguredOption;
    return newDefaultConfigOption;
  }

  if (optionConfigs.hasOwnProperty(trimProp) && optionConfigs[typeProp] === String) {
    assertType(optionConfigs[trimProp], 'boolean', `${trimProp} property`);
    defaultConfiguredOption.trim = optionConfigs[trimProp];
  } else if (optionConfigs[typeProp] === String) defaultConfiguredOption.trim = trim;

  if (optionConfigs.hasOwnProperty(minProp)) {
    assertType(optionConfigs[minProp], 'number', `${minProp} property`);
    defaultConfiguredOption.min = optionConfigs[minProp];
  }

  if (optionConfigs.hasOwnProperty(maxProp)) {
    assertType(optionConfigs[maxProp], 'number', `${maxProp} property`);
    defaultConfiguredOption.max = optionConfigs[maxProp];
  }

  return defaultConfiguredOption;
};
