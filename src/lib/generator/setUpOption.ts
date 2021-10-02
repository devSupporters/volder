import { min, max, required } from './defaultValues';
import { assertType } from '../utils/assertType';

const minProp: string = 'min';
const maxProp: string = 'max';
const requiredProp: string = 'required';
const typeProp: string = 'type';

export const setUpOptionWithConfigs = (optionConfigs: any) => {
  const defaultConfiguredOption = { min, max, type: optionConfigs.type, required };
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

  // avoid this property validators for some types (Boolean | Object | null)
  const avoidedTypes = [Boolean, Object, null];
  if (avoidedTypes.includes(optionConfigs[typeProp])) {
    // removeing min and max properties from default configuration object
    const { min, max, ...newDefaultConfigOption } = defaultConfiguredOption;
    return newDefaultConfigOption;
  }

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
