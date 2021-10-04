export const assertConstructorFunction = (input: any, addOneMessage:string = ''): void => {
  const allConstructorFunctions = [String, Number, Object, Array, Boolean];

  if (!allConstructorFunctions.includes(input)) {
    throw new TypeError(
      `Expected a constructor function like { String | Number | Object | Array | Boolean } but received a ${typeof input}`
    );
  }
};
