import { assertConstructorFunction } from '../src/lib/utils/assertConstructorFunction';
import { assertObject } from '../src/lib/utils/assertObject';
import { assertType } from '../src/lib/utils/assertType';

test('assertConstrucotrFunction function work correctly', () => {
  // Entering a correct values
  expect(assertConstructorFunction(String)).toBeUndefined();
  expect(assertConstructorFunction(Number)).toBeUndefined();
  expect(assertConstructorFunction(Boolean)).toBeUndefined();
  expect(assertConstructorFunction(Array)).toBeUndefined();
  expect(assertConstructorFunction(Object)).toBeUndefined();

  // Entering a wrong values
  const errorMessage =
    'Expected a constructor function like { String | Number | Object | Array | Boolean } but received a ';

  expect(() => assertConstructorFunction('string')).toThrowError(
    new TypeError(errorMessage + 'string')
  );
  expect(() => assertConstructorFunction({ name: 'max' })).toThrowError(
    new TypeError(errorMessage + 'object')
  );
  expect(() => assertConstructorFunction(undefined)).toThrowError(
    new TypeError(errorMessage + 'undefined')
  );
  expect(() => assertConstructorFunction(new Number(3))).toThrowError(
    new TypeError(errorMessage + 'object')
  );
});

test('assertObject function work correctly', () => {
  // Entering a correct values
  expect(assertObject({ result: 3 })).toBeUndefined();
  expect(assertObject({ name: 'person', age: 23 })).toBeUndefined();
  expect(assertObject(new Object({ value: 23 }))).toBeUndefined();

  // Entering a wrong values
  expect(() => assertObject(null)).toThrowError(
    new TypeError('Expected a object but received a null')
  );
  expect(() => assertObject('test')).toThrowError(
    new TypeError('Expected a object but received a string')
  );
  expect(() => assertObject([1, 2, 3])).toThrowError(
    new TypeError('Expected a object but received a Array')
  );
  expect(() => assertObject(3)).toThrowError(
    new TypeError('Expected a object but received a number')
  );
});

test('assertType function work correctly', () => {
  // Entering a correct values
  expect(assertType('test', 'string', 'person')).toBeUndefined();
  expect(assertType(100, 'number', 'house')).toBeUndefined();
  expect(assertType(true, 'boolean', 'sea')).toBeUndefined();
  expect(assertType(false, 'boolean', 'bathroom')).toBeUndefined();
  expect(assertType(new String('test'), 'string', 'sea')).toBeUndefined();
  expect(assertType(new Number(3), 'number', 'sea')).toBeUndefined();
  expect(assertType(new Boolean(true), 'boolean', 'sea')).toBeUndefined();

  // Entering a wrong values
  expect(() => assertType({ name: 'max' }, 'boolean', 'person')).toThrowError(
    new TypeError('Expected a boolean but received a Object at person')
  );
  expect(() => assertType(23, 'string', 'sea')).toThrowError(
    new TypeError('Expected a string but received a number at sea')
  );
  expect(() => assertType('test', 'number', 'house')).toThrowError(
    new TypeError('Expected a number but received a string at house')
  );
  expect(() => assertType([1, 2, 4], 'boolean', 'house')).toThrowError(
    new TypeError('Expected a boolean but received a Array at house')
  );
  expect(() => assertType(null, 'string', 'beach')).toThrowError(
    new TypeError('Expected a string but received a null at beach')
  );
  expect(() => assertType(new String('test'), 'number', 'beach')).toThrowError(
    new TypeError('Expected a number but received a String at beach')
  );
});
