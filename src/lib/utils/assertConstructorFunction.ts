export const assertConstructorFunction = (input: any): void => {
  const allTypes = [String, Number, Object, Array, Boolean];

  if (!allTypes.includes(input)) {
    throw new TypeError(
      `Expected a constructor function like { String | Number | Object | Array | Boolean } but received a ${input}`
    );
  }
};
