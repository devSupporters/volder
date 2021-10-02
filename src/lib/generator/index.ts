import { assertObject } from '../utils/assertObject';
import { assertConstructorFunction } from '../utils/assertConstructorFunction';
import { setUpOptionWithConfigs } from './setUpOption';

export const objectToMap = (config: any | object) => {
  const generatedMap = new Map();

  for (const option in config) {
    const types = [null, Boolean, Object, Number, String, Array];

    if (types.includes(config[option])) {
      config[option] = { type: config[option] };
    } else {
      assertObject(
        config[option],
        'Expected a (object | constructor function | null) but received a '
      );
    }

    if (config[option].hasOwnProperty('type')) {
      if (config[option].type !== null) {
        assertConstructorFunction(config[option].type);
      }
      const configuredOption = setUpOptionWithConfigs(config[option]);
      generatedMap.set(option, configuredOption);
    } else throw new Error(`type is required at ${option} property`);
  }

  return generatedMap;
};
