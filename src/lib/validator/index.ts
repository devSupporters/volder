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
    }  
    
    if (optionConfigs.required === true && typeof input[optionName] === 'undefined') {
      errors[optionName] = `${optionName} is required`;
      validInput = false;
    }
  });

  return [validInput, errors];
};
