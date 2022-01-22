import { setupOptionWithConfigs } from './generator/setuption/setup-option';
import { validator } from './validator/index';
import { assertObject } from './utils/assert-object';

export const singleVolder = (config) => {
  assertObject(config);
  const configObj = setupOptionWithConfigs(config);
  const volderMap = new Map();
  volderMap.set('', configObj)
  return {
    validate: (input) => {
      return validator(volderMap, { ['']: input }, true, true);
    },
    valid: (input) => {
      return validator(volderMap, { ['']: input }, false);
    },
    schema: configObj
  };
};
