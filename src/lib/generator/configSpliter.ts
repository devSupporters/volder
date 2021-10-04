import { assertType } from '../utils/assertType';

export const configSpliter = (
  optionName: string,
  optionType: 'string' | 'number' | 'boolean',
  optionConfigs: any,
  defaultConfiguredOption: any
): void => {
  if (optionConfigs[optionName].length <= 0) {
    throw Error(
      `Expected Array with two items [configuredValue, customError] but received empty Array at ${optionName} property`
    );
  } else if (optionConfigs[optionName].length === 1) {

    assertType(optionConfigs[optionName][0], optionType, `${optionName} property[0]`);
    defaultConfiguredOption[optionName] = optionConfigs[optionName][0];
  } else if (optionConfigs[optionName].length === 2) {

    assertType(optionConfigs[optionConfigs][0], optionType, `${optionName} property[0]`);
    assertType(optionConfigs[optionConfigs][1], 'string', `${optionName} property[1]`);

    defaultConfiguredOption[optionName] = optionConfigs[optionName][0];
    defaultConfiguredOption[optionName + 'ErrorMessage'] = optionConfigs[optionName][1];
  } else {
      throw new TypeError(`invalid configuration at ${optionName} property`)
  }
};
