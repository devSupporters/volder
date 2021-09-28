import {assertObject} from '../utils/assertObject';


export const objectToMap  = (config:any) => {
    const generatedMap = new Map();
    
    for(const option in config) {
        assertObject(config[option]);

        // assert object
        // set up object other function
        // for every loop set new map data [string, {all configs for that prop}]
    }
    return generatedMap;
}