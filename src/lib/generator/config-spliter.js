import { assertType } from '../utils/assert-type';
import { isValidType } from '../utils/is-valid-type';

export const configSpliter = (optionConfigName, optionConfigType, optionConfigs) => {
  const configProperty = optionConfigs[optionConfigName];

  if (configProperty.length === 0) {
    throw new TypeError(
      `Expected Array with two items [configuredValue, customError] but received empty Array at ${optionConfigName} property`
    );
  } else {
    if (optionConfigType === 'constructor-type') {
      isValidType(configProperty[0]);
    } else if (optionConfigType === 'function') {
      const type = typeof configProperty[0];
      if (type !== 'function') {
        throw new Error(`Expected function type but received ${type} in ${optionConfigName}[0] property`);
      }
    } else {
      assertType(configProperty[0], optionConfigType, `${optionConfigName}[0] property`);
    }

    optionConfigs[optionConfigName] = configProperty[0];

    // pull the custom error string
    if (configProperty.length > 1) {
      assertType(configProperty[1], 'string', `${optionConfigName}[1] property`);
      optionConfigs[optionConfigName + 'ErrorMessage'] = configProperty[1];
    }
  }
};
