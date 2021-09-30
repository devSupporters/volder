export const assertObject = (input: any) => {
  let isObject: boolean = typeof input === 'object' && !Array.isArray(input) && input !== null;

  if (!isObject) {
    let invalidType: string = typeof input;

    if (input === null) invalidType = 'null';
    else if (invalidType === 'object') invalidType = input.constructor.name;

    throw new TypeError(`Expected a object but received a ${invalidType}`);
  }
};
