import { min, max, required } from './defaultValues';
import { assertType } from '../utils/assertType';

const minProp: string = 'min';
const maxProp: string = 'max';
const requiredProp = 'required';

export const setUpOptionWithConfigs = (option: any) => {
  const defaultConfiguredOption = { min, max, type: option.type, required };

  if (typeof option[minProp] !== 'undefined') {
    assertType(option[minProp], 'number', `${minProp} property`);
    defaultConfiguredOption.min = option[minProp];
  }

  if (typeof option[maxProp] !== 'undefined') {
    assertType(option[maxProp], 'number', `${maxProp} property`);
    defaultConfiguredOption.max = option[maxProp];
  }

  if (typeof option[requiredProp] !== 'undefined') {
    assertType(option[requiredProp], 'boolean', `${requiredProp} property`);
    defaultConfiguredOption.required = option[requiredProp];
  }

  return defaultConfiguredOption;
};
