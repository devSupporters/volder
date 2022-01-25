import { arrayCase } from '../array';
import { stringCase } from '../string';
import { numberCase } from '../ number';
import { objectCase } from '../object';
import { booleanCase } from '../boolean';
import { validateAvoid } from './avoid';

export const nullCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  if (optionConfigs.hasOwnProperty('avoid')) {
    const isAvoidedType = validateAvoid(input[optionName], optionConfigs.avoid);
    if (!isAvoidedType.valid) {
      if (collectErrors) {
        errors[optionName] = optionConfigs.typeErrorMessage || `${isAvoidedType.type?.name} type not allowed`;
      }

      return false;
    }
  }

  if (Array.isArray(input[optionName])) {
    return arrayCase(input, optionName, optionConfigs, errors, collectErrors);
  } else if (typeof input[optionName] === 'string') {
    return stringCase(input, optionName, optionConfigs, errors, collectErrors);
  } else if (typeof input[optionName] === 'number') {
    return numberCase(input, optionName, optionConfigs, errors, collectErrors);
  } else if (typeof input[optionName] === 'object' && !Array.isArray(input[optionName]) && input[optionName] !== null) {
    return objectCase(input, optionName, optionConfigs, errors, collectErrors);
  } else if (typeof input[optionName] === 'boolean') {
    return booleanCase(input, optionName, optionConfigs, errors, collectErrors);
  }

  return true;
};
