import { inputValidator } from './inputValidator';

export const validator = (
  volderMap: Map<string, object>,
  input: object | any
) => {
  const errors: any = {};
  let validInput: boolean = true;

  volderMap.forEach((optionConfigs: any, optionName: string, _map) => {
    if (typeof input[optionName] !== 'undefined') {
      const is_valid_input = inputValidator(
        input,
        optionName,
        optionConfigs,
        errors
      );
      if (is_valid_input === false && validInput === true) validInput = false;
    } else if (optionConfigs.required === true) {
      errors[optionName] = `${optionName} is required`;
    }
  });

  return [validInput, errors];
};
