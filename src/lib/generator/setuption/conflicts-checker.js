export const conflictsChecker = (optionConfigs) => {
  // check if min is bigger than max
  if (optionConfigs.hasOwnProperty('min') && optionConfigs.hasOwnProperty('max') && optionConfigs.min > optionConfigs.max) {
    throw new Error('min property should be Equal or Smaller than max property');
  }

  // check if minLength is bigger than maxLength
  if (
    optionConfigs.hasOwnProperty('minLength') &&
    optionConfigs.hasOwnProperty('maxLength') &&
    optionConfigs.minLength > optionConfigs.maxLength
  ) {
    throw new Error('minLength property should be Equal or Smaller than maxLength property');
  }

  // check if has integer and float at the same time
  if (optionConfigs.float && optionConfigs.integer) {
    throw new Error("you can't add { float: true, integer: true } in the same option");
  }

  // check if optionConfig have strict and without or withat the same time
  if (
    optionConfigs.hasOwnProperty('strict') &&
    (optionConfigs.hasOwnProperty('without') || optionConfigs.hasOwnProperty('with'))
  ) {
    throw new Error("you can't add with or without config when you use strict config");
  }
};
