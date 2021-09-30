import { min, max, required } from './defaultValues';
import { assertType } from '../utils/assertType';

const minProp: string = 'min';
const maxProp: string = 'max';
const requiredProp = 'required';

export const setUpOptionWithConfigs = (optionConfigs: any) => {
  const defaultConfiguredOption = {
    min,
    max,
    type: optionConfigs.type,
    required
  };
  // check if min is smaller than max
  if (
    typeof optionConfigs[minProp] !== 'undefined' &&
    typeof optionConfigs[maxProp] !== 'undefined' &&
    optionConfigs[minProp] >= optionConfigs[maxProp]
  ) {
    throw Error('min property should be smaller than max property');
  }

  if (typeof optionConfigs[minProp] !== 'undefined') {
    assertType(optionConfigs[minProp], 'number', `${minProp} property`);
    defaultConfiguredOption.min = optionConfigs[minProp];
  }

  if (typeof optionConfigs[maxProp] !== 'undefined') {
    assertType(optionConfigs[maxProp], 'number', `${maxProp} property`);
    defaultConfiguredOption.max = optionConfigs[maxProp];
  }

  if (typeof optionConfigs[requiredProp] !== 'undefined') {
    assertType(
      optionConfigs[requiredProp],
      'boolean',
      `${requiredProp} property`
    );
    defaultConfiguredOption.required = optionConfigs[requiredProp];
  }

  return defaultConfiguredOption;
};
