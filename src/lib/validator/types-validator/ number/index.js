import { validateMax } from '../public/max';
import { validateMin } from '../public/min';
import { validateInt, validateFloat } from './integer-float';
import { validateSign } from './sign';
import { roundTransform } from './round';
import { fixedTransform } from './fixed';

export const numberCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  const isNumber = typeof input[optionName] === 'number' || input[optionName] instanceof Number;

  if (!isNumber) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be a number`;
    }
    return false;
  }

  if (optionConfigs.hasOwnProperty('min') && !validateMin(input[optionName], optionConfigs.min)) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.minErrorMessage || `${optionName} should be at least ${optionConfigs.min}`;
    }
    return false;
  }

  if (optionConfigs.hasOwnProperty('max') && !validateMax(input[optionName], optionConfigs.max)) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.maxErrorMessage || `${optionName} should be at most ${optionConfigs.max}`;
    }
    return false;
  }

  if (optionConfigs.hasOwnProperty('integer') && !validateInt(input[optionName])) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.integerErrorMessage || `${optionName} should be an Integer type`;
    }
    return false;
  }

  if (optionConfigs.hasOwnProperty('float') && !validateFloat(input[optionName])) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.floatErrorMessage || `${optionName} should be an Float type`;
    }
    return false;
  }

  if(optionConfigs.hasOwnProperty('sign') && !validateSign(input[optionName], optionConfigs.sign)) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.signErrorMessage || `${optionName} should be a ${sign} number`;
    }
    return false;
  }
  if (optionConfigs.round) input[optionName] = roundTransform(input[optionName]);
  if (optionConfigs.hasOwnProperty('fixed')) input[optionName] = fixedTransform(input[optionName], optionConfigs.fixed);
  
  return true;
};
