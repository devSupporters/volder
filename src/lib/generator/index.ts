import {assertObject} from '../utils/assertObject';
import {assertTypeProperty} from '../utils/assertTypeProperty';

export const objectToMap  = (config:any) => {
    const generatedMap = new Map();
    
    for(const option in config) {
        assertObject(config[option]);

        if(typeof config[option].type === 'undefined') throw new Error (`type is required at ${option} property`)
        else  assertTypeProperty(option)

        
        // set up object other function
        // for every loop set new map data [string, {all configs for that prop}]
    }
    return generatedMap;
}