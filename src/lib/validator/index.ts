import { validatorInput } from './validatorInput';

export const validator = (
  volderMap: Map<string, object>,
  input: object | any
) => {
  const errors: any = {};
  let validInput: boolean = true;

  volderMap.forEach((optionConfigs: any, optionName: string, _map) => {
    if (
      optionConfigs.required === true &&
      typeof input[optionName] === 'undefined'
    ) {
      errors[optionName] = `${optionName} is required`;
      validInput = validInput && false;
    }

    if (typeof input[optionName] !== 'undefined') {
      const is_valid_input = validatorInput(
        input,
        optionName,
        optionConfigs,
        errors
      );
      if (is_valid_input === false && validInput === true) validInput = false;
    }
  });

  return [validInput, errors];
};
