import { objectToMap } from '../src/lib/generator/index';
import { setupOptionWithConfigs } from '../src/lib/generator/setup-option';
import { configSpliter } from '../src/lib/generator/config-spliter';

test('objectToMap function should work correctly', () => {
  // Entering a correct values
  const customFunction = () => true;
  const obj1 = {
    name: { type: String, minLength: 3, maxLength: 10, trim: true, default: 'default' },
    age: { type: Number, max: 100, required: true },
    hasChild: { type: Boolean, required: true },
    items: { type: Array, required: true, minLength: 10, maxLength: 100 },
    any: { type: null, avoid: [String, Array, undefined] },
    test: { type: null, avoid: [], required: true },
    testCustomError: { type: [String, 'should be string'], minLength: [2, 'should 2 length'] },
    properties: Object,
    customFunction: { type: customFunction }
  };

  const generatedMap = objectToMap(obj1);

  expect(generatedMap.has('name')).toBe(true);
  expect(generatedMap.has('age')).toBe(true);
  expect(generatedMap.has('hasChild')).toBe(true);
  expect(generatedMap.has('items')).toBe(true);
  expect(generatedMap.has('properties')).toBe(true);
  expect(generatedMap.has('any')).toBe(true);
  expect(generatedMap.has('testCustomError')).toBe(true);
  expect(generatedMap.has('test')).toBe(true);
  expect(generatedMap.has('customFunction')).toBe(true);

  expect(generatedMap.get('name')).toEqual({
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 10,
    default: 'default'
  });
  expect(generatedMap.get('age')).toEqual({
    type: Number,
    max: 100,
    required: true
  });
  expect(generatedMap.get('hasChild')).toEqual({
    type: Boolean,
    required: true
  });
  expect(generatedMap.get('items')).toEqual({
    type: Array,
    required: true,
    minLength: 10,
    maxLength: 100
  });
  expect(generatedMap.get('properties')).toEqual({
    type: Object
  });
  expect(generatedMap.get('any')).toEqual({
    type: null,
    avoid: [String, Array, undefined]
  });
  expect(generatedMap.get('test')).toEqual({
    type: null,
    avoid: [],
    required: true
  });
  expect(generatedMap.get('testCustomError')).toEqual({
    type: String,
    minLength: 2,
    typeErrorMessage: 'should be string',
    minLengthErrorMessage: 'should 2 length'
  });
  expect(generatedMap.get('customFunction')).toEqual({
    type: customFunction
  });
  // Entering a wrong values
  const obj2 = { position: { require: true } };
  const obj3 = { name: 23 };
  const obj4 = { any: { type: null, avoid: 'welcome' } };
  const obj5 = { any: { type: null, avoid: [23, 'he'] } };
  const obj6 = { test: { type: ['string', String] } };
  const obj7 = { test: { type: [32] } };

  expect(() => {
    objectToMap(obj2);
  }).toThrowError(new TypeError('type property is required'));
  expect(() => objectToMap(obj3)).toThrowError(
    new TypeError('Expected a (object | constructor function | null | volder instance) but received a number')
  );
  expect(() => objectToMap(obj4)).toThrowError(new TypeError('avoid property should be an array'));
  expect(() => objectToMap(obj5)).toThrowError(
    new TypeError('Expected this types (String | Object | Array | Number | Boolean) but received type number which 23')
  );
  expect(() => objectToMap(obj6)).toThrowError(
    new TypeError(
      'Expected a type ( String | Number | Object | Array | Boolean | null | function type | Volder instance) but received a string'
    )
  );
  expect(() => objectToMap(obj7)).toThrowError(
    new TypeError(
      'Expected a type ( String | Number | Object | Array | Boolean | null | function type | Volder instance) but received a number'
    )
  );
});

test('setupOptionWithConfigs function should work correctly', () => {
  // Entring a correct values
  const obj1 = { type: Number };
  const obj2 = { type: String, required: true, minLength: 12, maxLength: 30 };
  const obj3 = { type: Boolean };
  const obj4 = {
    type: [String],
    required: [false, 'type not required'],
    maxLength: [11],
    minLength: [1, 'smaller than 1']
  };

  expect(setupOptionWithConfigs(obj1)).toEqual({ type: Number });
  expect(setupOptionWithConfigs(obj2)).toEqual({
    type: String,
    required: true,
    minLength: 12,
    maxLength: 30
  });
  expect(setupOptionWithConfigs(obj3)).toEqual({
    type: Boolean
  });
  expect(setupOptionWithConfigs(obj4)).toEqual({
    type: String,
    required: false,
    requiredErrorMessage: 'type not required',
    minLength: 1,
    maxLength: 11,
    minLengthErrorMessage: 'smaller than 1'
  });

  // Entering a wrong values
  const wrongObj1 = { type: Number, min: '3' };
  const wrongObj2 = { type: String, maxLength: false };
  const wrongObj3 = { type: Number, required: 2 };
  const wrongObj4 = { type: Number, min: 10, max: 8 };
  const wrongObj5 = { type: Array, minLength: 100, maxLength: 10 };
  const wrongObj6 = { type: Array, minLength: -1 };
  const wrongObj7 = { type: Number, trim: true };

  expect(() => setupOptionWithConfigs(wrongObj1)).toThrowError(
    new TypeError('Expected a number but received a string at min property')
  );
  expect(() => setupOptionWithConfigs(wrongObj2)).toThrowError(
    new TypeError('Expected a number but received a boolean at maxLength property')
  );
  expect(() => setupOptionWithConfigs(wrongObj3)).toThrowError(
    new TypeError('Expected a boolean but received a number at required property')
  );
  expect(() => setupOptionWithConfigs(wrongObj4)).toThrowError(
    new Error('min property should be Equal or Smaller than max property')
  );
  expect(() => setupOptionWithConfigs(wrongObj5)).toThrowError(
    new Error('minLength property should be Equal or Smaller than maxLength property')
  );
  expect(() => setupOptionWithConfigs(wrongObj6)).toThrowError(
    new Error('minLength property should be at least equal 0 but received -1')
  );
  expect(() => setupOptionWithConfigs(wrongObj7)).toThrowError(
    new Error('trim: option config not allowed, allowed keys { min, max, required, type, default, pattern }')
  );

  // entring wrong value in default config && use required with default at the same time
  const wrongObj8 = { type: String, default: 12 };
  const wrongObj9 = { type: Boolean, default: [1, 2, 3] };
  const wrongObj10 = { type: Array, default: true };
  const wrongObj11 = { type: Object, default: null };
  const wrongObj12 = { type: Number, default: 'string' };
  const wrongObj13 = { type: Array, default: [1, 2, 3], required: true };

  expect(() => setupOptionWithConfigs(wrongObj8)).toThrowError(
    new Error('Expected a String type value in default to properly to { type: String }')
  );
  expect(() => setupOptionWithConfigs(wrongObj9)).toThrowError(
    new Error('Expected a Boolean type value in default to properly to { type: Boolean }')
  );
  expect(() => setupOptionWithConfigs(wrongObj10)).toThrowError(
    new Error('Expected a Array type value in default to properly to { type: Array }')
  );
  expect(() => setupOptionWithConfigs(wrongObj11)).toThrowError(
    new Error('Expected a Object type value in default to properly to { type: Object }')
  );
  expect(() => setupOptionWithConfigs(wrongObj12)).toThrowError(
    new Error('Expected a Number type value in default to properly to { type: Number }')
  );
  expect(() => setupOptionWithConfigs(wrongObj13)).toThrowError(
    new Error("you can't set { required: true } and use default key at the same time")
  );
});

test('configSpliter should work correctly', () => {
  const configs = {
    type: [String, 'any type arent string not work'],
    minLength: [23],
    max: [10, 'bigger than 10'],
    required: [true, 'test for required is work']
  };

  configSpliter('type', 'constructor-type', configs);
  configSpliter('minLength', 'number', configs);
  configSpliter('required', 'boolean', configs);
  configSpliter('max', 'number', configs);
  expect(configs).toEqual({
    type: String,
    minLength: 23,
    required: true,
    max: 10,
    requiredErrorMessage: 'test for required is work',
    typeErrorMessage: 'any type arent string not work',
    maxErrorMessage: 'bigger than 10'
  });

  // Entering wrong values

  const wrongConfigs = {
    max: [],
    required: ['test'],
    minLength: [23, true],
    trim: [{}, 'welcome']
  };

  expect(() => configSpliter('max', 'number', wrongConfigs)).toThrowError(
    new TypeError('Expected Array with two items [configuredValue, customError] but received empty Array at max property')
  );
  expect(() => configSpliter('required', 'boolean', wrongConfigs)).toThrowError(
    new TypeError('Expected a boolean but received a string at required[0] property')
  );
  expect(() => configSpliter('minLength', 'number', wrongConfigs)).toThrowError(
    new TypeError('Expected a string but received a boolean at minLength[1] property')
  );
  expect(() => configSpliter('trim', 'boolean', wrongConfigs)).toThrowError(
    new TypeError('Expected a boolean but received a Object at trim[0] property')
  );
});
