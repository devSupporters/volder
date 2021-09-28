import {assertObject} from '../utils/assertObject';
import {assertTypeProperty} from '../utils/assertConstructorFunction';
import {setUpOptionWithConfigs} from './setUpOption';

export const objectToMap  = (config:any) => {
    const generatedMap = new Map();
    
    for(const option in config) {
        assertObject(config[option]);

        if(typeof config[option].type === 'undefined') throw new Error (`type is required at ${option} property`)
        else  assertTypeProperty(option)

        const configuredOption = setUpOptionWithConfigs(config[option]);
        generatedMap.set(option, configuredOption);
    }

    return generatedMap;
}
