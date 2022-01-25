import {isValidDate} from '../../../utils/is-valid-date';

export const validateAfter = (input, afterConfig)=> { // is array validation
    return isValidDate(input) && new Date(input) > new Date(afterConfig);
}

export const validateBefore = (input, beforeConfig)=> {
    return isValidDate(input) && new Date(input) < new Date(beforeConfig);
}