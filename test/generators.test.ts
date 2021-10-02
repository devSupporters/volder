import { objectToMap } from '../src/lib/generator/index';
import { setUpOptionWithConfigs } from '../src/lib/generator/setUpOption';

test('objectToMap function should work correctly', () => {
  // Entering a correct values
  const obj1 = {
    name: { type: String, min: 3 },
    age: { type: Number, max: 100, required: true },
    hasChild: { type: Boolean, required: true },
    items:{type:Array, required:true, min:10, max:100},
    properties:Object
  };

  const generatedMap = objectToMap(obj1);

  expect(generatedMap.has('name')).toBe(true);
  expect(generatedMap.has('age')).toBe(true);
  expect(generatedMap.has('hasChild')).toBe(true);
  expect(generatedMap.has('items')).toBe(true);
  expect(generatedMap.has('properties')).toBe(true);

  expect(generatedMap.get('name')).toEqual({
    type: String,
    trim:false,
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
    min:10,
    max:100
  });
  expect(generatedMap.get('properties')).toEqual({
    type: Object, 
    required:false
  });

  // Entering a wrong values
  const obj2 = { position: { require: true } };

  expect(() => {
    objectToMap(obj2);
  }).toThrowError(new TypeError('type is required at position property'));
});

test('setUpOptionWithConfigs function should work correctly', () => {
  // Entring a correct values
  const obj1 = { type: Number };
  const obj2 = { type: String, required: true, min: 12, max: 30 };
  const obj3 = { type: Boolean };

  expect(setUpOptionWithConfigs(obj1)).toEqual({
    min: null,
    max: null,
    type: Number,
    required: false
  });
  expect(setUpOptionWithConfigs(obj2)).toEqual({
    type: String,
    required: true,
    trim:false,
    min: 12,
    max: 30
  });
  expect(setUpOptionWithConfigs(obj3)).toEqual({
    type: Boolean,
    required: false
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
    new Error('min property should be smaller than max property')
  );
});
