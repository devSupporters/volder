import { assertObject } from '../utils/assertObject';
import { assertConstructorFunction } from '../utils/assertConstructorFunction';
import { setUpOptionWithConfigs } from './setUpOption';

export const objectToMap = (config: any | object) => {
  const generatedMap = new Map();

  for (const option in config) {
    assertObject(config[option]);

    if (config[option].hasOwnProperty('type')) {
      assertConstructorFunction(config[option].type);
      const configuredOption = setUpOptionWithConfigs(config[option]);
      generatedMap.set(option, configuredOption);
    } else throw new Error(`type is required at ${option} property`);
  }

  return generatedMap;
};
