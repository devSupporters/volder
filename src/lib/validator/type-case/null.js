import { arrayCase } from './array';
import { stringCase } from './string';
import { numberCase } from './number';
import { validateAvoid } from '../configs-validators/avoid';

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

  if (input[optionName].constructor.name === 'Array') {
    return arrayCase(input, optionName, optionConfigs, errors, collectErrors);
  } else if (input[optionName].constructor.name === 'String') {
    return stringCase(input, optionName, optionConfigs, errors, collectErrors);
  } else if (input[optionName].constructor.name === 'Number') {
    return numberCase(input, optionName, optionConfigs, errors, collectErrors);
  }

  if (optionConfigs.hasOwnProperty('pattern') && !optionConfigs.pattern(input[optionName])) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.patternErrorMessage || `${optionName} is not in proper pattern`;
    }

    return false;
  }
  return true;
};
