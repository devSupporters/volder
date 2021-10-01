import { validatorInput } from './validatorInput';

export const validator = (volderMap: Map<string, object>, input: object | any) => {

  const errors: any = {};
  let validInput: boolean = true;

  volderMap.forEach((optionConfigs: any, optionName: string, _map) => {
    
    // check if option is required
    if (optionConfigs.required === true && !input.hasOwnProperty(optionName)) {
      errors[optionName] = `${optionName} is required`;
      validInput = validInput && false;
    }

    // run validator if option input is exist
    if (input.hasOwnProperty(optionName)) {
      const is_valid_input = validatorInput(input, optionName, optionConfigs, errors);
      if (is_valid_input === false && validInput === true) validInput = false;
    }
  });

  return [validInput, errors];
};
