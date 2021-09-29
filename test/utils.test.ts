import { assertConstructorFunction } from '../src/lib/utils/assertConstructorFunction';
// import { assertObject } from '../src/lib/utils/assertObject';
// import { assertType } from '../src/lib/utils/assertType';

test('assertConstrucotrFunction work correctly', () => {
  // Entering a correct inputes
  expect(assertConstructorFunction(String)).toBeUndefined();
  expect(assertConstructorFunction(Number)).toBeUndefined();
  expect(assertConstructorFunction(Boolean)).toBeUndefined();
  expect(assertConstructorFunction(Array)).toBeUndefined();
  expect(assertConstructorFunction(Object)).toBeUndefined();

  // Entering a wrong inputes
  const errorMessage = 'Expected a constructor function like { String | Number | Object | Array | Boolean } but received a ';

  expect(() => assertConstructorFunction('string')).toThrowError(new TypeError(errorMessage + 'string'));
  expect(() => assertConstructorFunction({})).toThrowError(new TypeError(errorMessage + 'object'));
  expect(() => assertConstructorFunction(null)).toThrowError(new TypeError(errorMessage + 'object'));
  expect(() => assertConstructorFunction(undefined)).toThrowError(new TypeError(errorMessage + 'undefined'));
  expect(() => assertConstructorFunction(new Number(3))).toThrowError(new TypeError(errorMessage + 'number'));
});
 