import {min, max} from './defaultValues';
import {assertStringOrNumber} from '../utils/assertStringOrNumber';

const minProp:string = 'min';
const maxProp:string = 'max';

export const setUpOptionWithConfigs = (option:any) => {
    const defaultConfiguredOption = {min, max, type:option.type};

    if(typeof option[minProp] !== 'undefined') {
        assertStringOrNumber(option[minProp], 'number',`${minProp} property`);
        defaultConfiguredOption.min = option[minProp];
    }
    if(typeof option[maxProp] !== 'undefined') {
        assertStringOrNumber(option[maxProp], 'number',`${maxProp} property`);
        defaultConfiguredOption.max = option[maxProp];
    }
    return defaultConfiguredOption;
}
