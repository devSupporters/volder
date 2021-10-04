import { assertType } from '../utils/assertType';

export const configSpliter = (
  optionConfigName: string,
  optionConfigType: 'string' | 'number' | 'boolean', // there are array type you should chnage it 
  optionConfigs: any,
  defaultConfiguredOption: any
): void => {
  if (optionConfigs[optionConfigName].length <= 0) {
    throw Error(
      `Expected Array with two items [configuredValue, customError] but received empty Array at ${optionConfigName} property`
    );
  } else if (optionConfigs[optionConfigName].length === 1) {

    assertType(optionConfigs[optionConfigName][0], optionConfigType, `${optionConfigName} property[0]`);
    defaultConfiguredOption[optionConfigName] = optionConfigs[optionConfigName][0];
  } else if (optionConfigs[optionConfigName].length === 2) {

    assertType(optionConfigs[optionConfigs][0], optionConfigType, `${optionConfigName} property[0]`);
    assertType(optionConfigs[optionConfigs][1], 'string', `${optionConfigName} property[1]`);

    defaultConfiguredOption[optionConfigName] = optionConfigs[optionConfigName][0];
    defaultConfiguredOption[optionConfigName + 'ErrorMessage'] = optionConfigs[optionConfigName][1];
  } else {
      throw new TypeError(`invalid configuration at ${optionConfigName} property`)
  }
};
