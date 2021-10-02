export const assertObject = (input: any, customMessage?: string) => {
  let isObject: boolean = typeof input === 'object' && !Array.isArray(input) && input !== null;

  if (!isObject) {
    let invalidType: string = typeof input;

    if (input === null) invalidType = 'null';
    else if (invalidType === 'object') invalidType = input.constructor.name;

    throw new TypeError((customMessage || "Expected a object but received a ") + invalidType);
  }
};
