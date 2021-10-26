import { assertType } from '../utils/assert-type';
import { isValidType } from '../utils/is-valid-type';

export const configSpliter = (optionConfigName, optionConfigType, optionConfigs) => {
  const configProperty = optionConfigs[optionConfigName];

  if (configProperty.length === 0) {
    throw new TypeError(
      `Expected Array with two items [configuredValue, customError] but received empty Array at ${optionConfigName} property`
    );
  } else {
    optionConfigType !== 'constructor-type'
      ? assertType(configProperty[0], optionConfigType, `${optionConfigName}[0] property`)
      : isValidType(configProperty[0]);

    optionConfigs[optionConfigName] = configProperty[0];

    if (configProperty.length > 1) {
      assertType(configProperty[1], 'string', `${optionConfigName}[1] property`);
      optionConfigs[optionConfigName + 'ErrorMessage'] = configProperty[1];
    }
  }
};
