export const assertConstructorFunction = (input: any): void => {
  const allConstructorFunctions = [String, Number, Object, Array, Boolean, null];

  if (!allConstructorFunctions.includes(input)) {
    throw new TypeError(
      `Expected a constructor function like { String | Number | Object | Array | Boolean } but received a ${typeof input}`
    );
  }
};
