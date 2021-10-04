import { assertType } from '../utils/assertType';

export const configSpliter = (
  optionConfigName: string,
  optionConfigType: 'string' | 'number' | 'boolean' | 'any-type' | any, // there are array type you should chnage it 
  optionConfigs: any,
  defaultConfiguredOption: any
): void => {
  

  if (optionConfigs[optionConfigName].length <= 0) {
    throw TypeError(
      `Expected Array with two items [configuredValue, customError] but received empty Array at ${optionConfigName} property`
    );
  } else if (optionConfigs[optionConfigName].length === 1) {
    if(optionConfigType !== 'any-type') {
      assertType(optionConfigs[optionConfigName][0], optionConfigType, `${optionConfigName}[0] property`);
    }
    defaultConfiguredOption[optionConfigName] = optionConfigs[optionConfigName][0];
    
  } else if (optionConfigs[optionConfigName].length === 2) {
    if(optionConfigType !== 'any-type') {
      assertType(optionConfigs[optionConfigName][0], optionConfigType, `${optionConfigName}[0] property`);
    }
    assertType(optionConfigs[optionConfigName][1], 'string', `${optionConfigName}[1] property`);

    defaultConfiguredOption[optionConfigName] = optionConfigs[optionConfigName][0];
    defaultConfiguredOption[optionConfigName + 'ErrorMessage'] = optionConfigs[optionConfigName][1];
  } else {
      throw new TypeError(`invalid configuration at ${optionConfigName} property`)
  }
};
