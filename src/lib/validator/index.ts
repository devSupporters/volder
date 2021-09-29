import { inputValidator } from './inputValidator';

export const validator = (
  volderMap: Map<string, object>,
  input: object | any
) => {
  const errors = {};
  let validInput = true;

  volderMap.forEach((value: object, key: string, _map) => {
    if (typeof input[key] !== 'undefined') {
      inputValidator(input,key , value, validInput, errors);
    }
    // there are code for validate the input prop are required
  });

  return [validInput, errors];
};
