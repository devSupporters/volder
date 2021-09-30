export const assertType = (
  input: number | string | boolean | any,
  type: 'string' | 'number' | 'boolean',
  position: string 
) => {
  let ValidType;

  if (type === 'string') ValidType = typeof input === type || input instanceof String;
  if (type === 'number') ValidType = typeof input === type || input instanceof Number;
  if (type === 'boolean') ValidType = typeof input === type || input instanceof Boolean;

  if (!ValidType) {
    let invalidType: string = typeof input;

    if (input === null) invalidType = 'null';
    else if (invalidType === 'object') invalidType = input.constructor.name;

    throw new TypeError(
      `Expected a ${type} but received a ${invalidType} at ${position}`
    );
  }
};
