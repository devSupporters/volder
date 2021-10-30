import { isValidType } from '../src/lib/utils/is-valid-type';
import { assertObject } from '../src/lib/utils/assert-object';
import { assertType } from '../src/lib/utils/assert-type';
import { deepClone } from '../src/lib/utils/deep-clone';
import { Volder } from '../src/index';

test('isValidType function work correctly', () => {
  // Entering a correct values
  expect(isValidType(String)).toBe(true);
  expect(isValidType(Number)).toBe(true);
  expect(isValidType(Boolean)).toBe(true);
  expect(isValidType(Array)).toBe(true);
  expect(isValidType(Object)).toBe(true);
  expect(isValidType(new Volder({}))).toBe(true);
  expect(isValidType(null)).toBe(true);

  // Entering a wrong values
  const errorMessage =
    'Expected a type ( String | Number | Object | Array | Boolean | null | function type | Volder instance) but received a ';

  expect(() => isValidType('string')).toThrowError(new TypeError(errorMessage + 'string'));
  expect(() => isValidType({ name: 'max' })).toThrowError(new TypeError(errorMessage + 'object'));
  expect(() => isValidType(undefined)).toThrowError(new TypeError(errorMessage + 'undefined'));
  expect(() => isValidType(new Number(3))).toThrowError(new TypeError(errorMessage + 'object'));
});

test('assertObject function work correctly', () => {
  // Entering a correct values
  expect(assertObject({ result: 3 })).toBeUndefined();
  expect(assertObject({ name: 'person', age: 23 })).toBeUndefined();
  expect(assertObject(new Object({ value: 23 }))).toBeUndefined();

  // Entering a wrong values
  expect(() => assertObject(null)).toThrowError(new TypeError('Expected a object but received a null'));
  expect(() => assertObject('test')).toThrowError(new TypeError('Expected a object but received a string'));
  expect(() => assertObject([1, 2, 3])).toThrowError(new TypeError('Expected a object but received a Array'));
  expect(() => assertObject(3)).toThrowError(new TypeError('Expected a object but received a number'));
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
  expect(() => assertType(23, 'string', 'sea')).toThrowError(new TypeError('Expected a string but received a number at sea'));
  expect(() => assertType('test', 'number', 'house')).toThrowError(
    new TypeError('Expected a number but received a string at house')
  );
  expect(() => assertType([1, 2, 4], 'boolean', 'house')).toThrowError(
    new TypeError('Expected a boolean but received a Array at house')
  );
  expect(() => assertType(null, 'string', 'beach')).toThrowError(new TypeError('Expected a string but received a null at beach'));
  expect(() => assertType(new String('test'), 'number', 'beach')).toThrowError(
    new TypeError('Expected a number but received a String at beach')
  );
});

test('deepCone should work correctly', () => {
  const obj1 = { name: 'alguerocde', age: 23, address: null };
  const obj2 = { ...obj1, user: { email: 'test@test.com', password: 'sdhgfosd232', address: null } };
  const obj3 = { ...obj1, user: { ...obj2.user }, array: [1, 23, 23, 23, null, { ...obj1 }] };

  expect(deepClone(obj1)).toEqual(obj1);
  expect(deepClone(obj2)).toEqual(obj2);
  expect(deepClone(obj3)).toEqual(obj3);

  expect(deepClone(obj1)).not.toBe(obj1);
  expect(deepClone(obj2)).not.toBe(obj2);
  expect(deepClone(obj3)).not.toBe(obj3);

  expect(deepClone(obj2).user).not.toBe(obj2.user);
  expect(deepClone(obj3).array).not.toBe(obj3.array);
});
