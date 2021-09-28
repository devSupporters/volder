import {DefaultOptionConfigs} from '../types/defaultTypes';
import {min, max} from './defaultValues';
import {assertStringOrNumber} from '../utils/assertStringOrNumber';

const minProp = 'min';
const maxProp = 'max';

export const setUpOptionWithConfigs = (option:DefaultOptionConfigs) => {
    const configuredOption:{min:number, max:typeof max} = {min, max};

    if(typeof option[minProp] !== 'undefined') {
        assertStringOrNumber(option[minProp], 'number');
        configuredOption.min= option.min;
    }
    if(typeof option[maxProp] !== 'undefined') {
        assertStringOrNumber(option[maxProp], 'number');
        configuredOption[maxProp] = option[maxProp];
    }
    return configuredOption;
}
