import { validateMax } from '../public/max';
import { validateMin } from '../public/min';
import { validateWhitespace } from './whitespace';
import { validateAlphanumeric } from './alphanumeric';
import { validateMatches } from './matches';
import { validateLowercase, validateUppercase } from './upper-lower';

export const stringCase = (input, optionName, optionConfigs, errors, collectErrors) => {
  const isString = typeof input[optionName] === 'string' || input[optionName] instanceof String;

  if (!isString) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.typeErrorMessage || `${optionName} should be a string`;
    }

    return false;
  }
  // validate if have no-spaces config;
  if (optionConfigs.hasOwnProperty('trim') && optionConfigs.trim) {
    input[optionName] = input[optionName].trim();

    if (input[optionName].length === 0 && optionConfigs.required === true && optionConfigs.min !== 0) {
      errors[optionName] = optionConfigs.requiredErrorMessage || `${optionName} is required`;

      return false;
    }
  }

  if (optionConfigs.hasOwnProperty('minLength') && !validateMin(input[optionName].length, optionConfigs.minLength)) {
    if (collectErrors) {
      errors[optionName] =
        optionConfigs.minLengthErrorMessage || `${optionName} should be at least ${optionConfigs.minLength} length`;
    }

    return false;
  }

  if (optionConfigs.hasOwnProperty('maxLength') && !validateMax(input[optionName].length, optionConfigs.maxLength)) {
    if (collectErrors) {
      errors[optionName] =
        optionConfigs.maxLengthErrorMessage || `${optionName} should be at most ${optionConfigs.maxLength} length`;
    }

    return false;
  }

  if (optionConfigs.hasOwnProperty('whitespace') && !optionConfigs.whitespace && !validateWhitespace(input[optionName])) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.whitespaceErrorMessage || `${optionName} should be without whitespace`;
    }

    return false;
  }

  if (optionConfigs.hasOwnProperty('alphanumeric') && optionConfigs.alphanumeric && !validateAlphanumeric(input[optionName])) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.alphanumericErrorMessage || `${optionName} is not alphanumeric`;
    }

    return false;
  }

  if (optionConfigs.hasOwnProperty('uppercase') && optionConfigs.uppercase && !validateUppercase(input[optionName])) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.uppercaseErrorMessage || `${optionName} is not in uppercase`;
    }

    return false;
  }

  if (optionConfigs.hasOwnProperty('lowercase') && optionConfigs.lowercase && !validateLowercase(input[optionName])) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.lowercaseErrorMessage || `${optionName} is not in lowercase`;
    }

    return false;
  }

  if (optionConfigs.hasOwnProperty('matches') && !validateMatches(input[optionName], optionConfigs.matches)) {
    if (collectErrors) {
      errors[optionName] = optionConfigs.matchesErrorMessage || `${optionName} is not matches regular expression`;
    }

    return false;
  }

  return true;
};
