import { inputValidator } from './inputValidator';

export const validator = (
  volderMap: Map<string, object>,
  input: object | any
) => {
  const errors = {};
  let validInput = true;

  volderMap.forEach((optionConfigs: object, optionName: string, _map) => {

    if (typeof input[optionName] !== 'undefined') {
      const is_valid_input = inputValidator(input,optionName , optionConfigs, errors);

      // set validInput to false if there error
      if(is_valid_input === false && validInput === true) validInput = false;
    }
    // } else if}
    // there are code for validate the input prop are required
  });

  return [validInput, errors];
};
