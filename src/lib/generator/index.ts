import { assertObject } from '../utils/assertObject';
import { assertConstructorFunction } from '../utils/assertConstructorFunction';
import { setUpOptionWithConfigs } from './setUpOption';
import { configSpliter } from './configSpliter';
import { max, min, required} from './defaultValues';

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

    if (config[option].hasOwnProperty('type')) {
      const defaultConfiguredOption: any = { min, max, type: config[option].type, required };

      if(Array.isArray(config[option].type)) {
        configSpliter('type','any-type', config[option], defaultConfiguredOption);
      }

      // null means any data type
      if (config[option].type !== null) {
        assertConstructorFunction(config[option].type);
      }

      const configuredOption = setUpOptionWithConfigs(config[option]);
      generatedMap.set(option, configuredOption);
    } else throw new Error(`type is required at ${option} property`);
  }

  return generatedMap;
};
