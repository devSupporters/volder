import { assertObject } from '../utils/assertObject';
import { setUpOptionWithConfigs } from './setUpOption';

export const objectToMap = (config: any | object) => {
  const generatedMap = new Map();

  for (const option in config) {
    
    // if option just constructor function or null
    const types = [null, Boolean, Object, Number, String, Array];
    if (types.includes(config[option])) {
      config[option] = { type: config[option] };
    } else {
      assertObject(
        config[option],
        'Expected a (object | constructor function | null) but received a '
      );
    }

    const configuredOption = setUpOptionWithConfigs(config[option]);
    generatedMap.set(option, configuredOption);
  }

  return generatedMap;
};
