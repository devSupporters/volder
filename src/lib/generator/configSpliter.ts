import { assertType } from '../utils/assertType';
import { assertConstructorFunction } from '../utils/assertConstructorFunction';

export const configSpliter = (
  optionConfigName: string,
  optionConfigType: 'string' | 'number' | 'boolean' | 'constructor-type' | any,
  optionConfigs: any,
  defaultConfiguredOption: any
): void => {
  
  const optionProperty = optionConfigs[optionConfigName];

  if (optionProperty.length <= 0) {
    throw TypeError(
      `Expected Array with two items [configuredValue, customError] but received empty Array at ${optionConfigName} property`
    );
  }

  if (optionProperty.length > 0) {
    optionConfigType !== 'constructor-type'
      ? assertType(optionProperty[0], optionConfigType, `${optionConfigName}[0] property`)
      : assertConstructorFunction(optionProperty[0]);

    defaultConfiguredOption[optionConfigName] = optionProperty[0];
  }

  if (optionProperty.length > 1) {
    assertType(optionProperty[1], 'string', `${optionConfigName}[1] property`);
    defaultConfiguredOption[optionConfigName + 'ErrorMessage'] = optionProperty[1];
  }
};
