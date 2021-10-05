import { objectToMap } from '../src/lib/generator/index';
import { setUpOptionWithConfigs } from '../src/lib/generator/setUpOption';
import { configSpliter } from '../src/lib/generator/configSpliter';

test('objectToMap function should work correctly', () => {
  // Entering a correct values
  const obj1 = {
    name: { type: String, min: 3, trim: true, avoid: [String, Number] },
    age: { type: Number, max: 100, required: true },
    hasChild: { type: Boolean, required: true },
    items: { type: Array, required: true, min: 10, max: 100 },
    any: { type: null, avoid: [String, Array] },
    test: { type: null, avoid: [], required: true },
    testCustomError: { type: [String, 'should be string'], min: [2, 'should 2 length'] },
    properties: Object
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

  expect(generatedMap.get('name')).toEqual({
    type: String,
    trim: true,
    max: null,
    min: 3,
    required: false
  });
  expect(generatedMap.get('age')).toEqual({
    type: Number,
    max: 100,
    min: null,
    required: true
  });
  expect(generatedMap.get('hasChild')).toEqual({
    type: Boolean,
    required: true
  });
  expect(generatedMap.get('items')).toEqual({
    type: Array,
    required: true,
    min: 10,
    max: 100
  });
  expect(generatedMap.get('properties')).toEqual({
    type: Object,
    required: false
  });
  expect(generatedMap.get('any')).toEqual({
    type: null,
    avoid: [String, Array],
    required: false
  });
  expect(generatedMap.get('test')).toEqual({
    type: null,
    required: true
  });
  expect(generatedMap.get('testCustomError')).toEqual({
    type: String,
    min: 2,
    max: null,
    required: false,
    typeErrorMessage: 'should be string',
    minErrorMessage: 'should 2 length'
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
    new TypeError('Expected a (object | constructor function | null) but received a number')
  );
  expect(() => objectToMap(obj4)).toThrowError(new TypeError('avoid property should be an array'));
  expect(() => objectToMap(obj5)).toThrowError(
    new TypeError(
      'Expected this types (String | Object | Array | Number | Boolean) but received type number which 23'
    )
  );
  expect(() => objectToMap(obj6)).toThrowError(
    new TypeError(
      'Expected a constructor function like { String | Number | Object | Array | Boolean } but received a string'
    )
  );
  expect(() => objectToMap(obj7)).toThrowError(
    new TypeError(
      'Expected a constructor function like { String | Number | Object | Array | Boolean } but received a number'
    )
  );
});

test('setUpOptionWithConfigs function should work correctly', () => {
  // Entring a correct values
  const obj1 = { type: Number };
  const obj2 = { type: String, required: true, min: 12, max: 30 };
  const obj3 = { type: Boolean };
  const obj4 = {
    type: [String],
    required: [false, 'type not required'],
    max: [11],
    min: [1, 'smaller than 1']
  };

  expect(setUpOptionWithConfigs(obj1)).toEqual({
    min: null,
    max: null,
    type: Number,
    required: false
  });
  expect(setUpOptionWithConfigs(obj2)).toEqual({
    type: String,
    required: true,
    min: 12,
    max: 30
  });
  expect(setUpOptionWithConfigs(obj3)).toEqual({
    type: Boolean,
    required: false
  });
  expect(setUpOptionWithConfigs(obj4)).toEqual({
    type: String,
    required: false,
    requiredErrorMessage:'type not required',
    min:1,
    max:11,
    minErrorMessage:'smaller than 1'
  });

  // Entering a wrong values
  const wrongObj1 = { type: Number, min: '3' };
  const wrongObj2 = { type: String, max: false };
  const wrongObj3 = { type: Number, required: 2 };
  const wrongObj4 = { type: Number, min: 10, max: 8 };

  expect(() => setUpOptionWithConfigs(wrongObj1)).toThrowError(
    new TypeError('Expected a number but received a string at min property')
  );
  expect(() => setUpOptionWithConfigs(wrongObj2)).toThrowError(
    new TypeError('Expected a number but received a boolean at max property')
  );
  expect(() => setUpOptionWithConfigs(wrongObj3)).toThrowError(
    new TypeError('Expected a boolean but received a number at required property')
  );
  expect(() => setUpOptionWithConfigs(wrongObj4)).toThrowError(
    new Error('min property should be Equal or Smaller than max property')
  );
});

test('configSpliter should work correctly', () => {
  const configs = {
    type: [String, 'any type arent string not work'],
    min: [23],
    max: [10, 'bigger than 10'],
    required: [true, 'test for required is work']
  };
  let defaults = {};
  configSpliter('type', 'constructor-type', configs, defaults);
  configSpliter('min', 'number', configs, defaults);
  configSpliter('required', 'boolean', configs, defaults);
  configSpliter('max', 'number', configs, defaults);
  expect(defaults).toEqual({
    type: String,
    min: 23,
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
    min: [23, true],
    trim: [{}, 'welcome']
  };
  defaults = {};

  expect(() => configSpliter('max', 'number', wrongConfigs, defaults)).toThrowError(
    new TypeError(
      'Expected Array with two items [configuredValue, customError] but received empty Array at max property'
    )
  );
  expect(() => configSpliter('required', 'boolean', wrongConfigs, defaults)).toThrowError(
    new TypeError('Expected a boolean but received a string at required[0] property')
  );
  expect(() => configSpliter('min', 'number', wrongConfigs, defaults)).toThrowError(
    new TypeError('Expected a string but received a boolean at min[1] property')
  );
  expect(() => configSpliter('trim', 'boolean', wrongConfigs, defaults)).toThrowError(
    new TypeError('Expected a boolean but received a Object at trim[0] property')
  );
});
