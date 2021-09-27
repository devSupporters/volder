import {objectToMap} from './generator/index';

export class Volder {
    constructor(private config:object) {
        this.config = config;
        console.log("welcome")
        objectToMap(this.config)
    }
}