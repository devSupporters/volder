import { validator } from '../src/lib/validator/index';
import { Volder } from '../src/index';

test('validator function should work correctly', () => {
  const { volderMap } = new Volder({
    name: { type: String, min: 10 },
    lastName: { type: String, max: 4, trim: true, min: 1 },
    age: { type: Number, max: 100, required: true },
    male: { type: Boolean, required: true },
    items: { type: Array, min: 2, max: 10 },
    tools: { type: Object },
    any: { type: null, required: true },
    restrictedTypes: { type: null, avoid: [String, Number] },
    notAllowAvoidTypes: { type: [null, 'null and undefined not allowed'], avoid: [null, undefined] }
  });

  const obj1 = {
    name: 'max and min and welcome',
    age: 90,
    male: true,
    tools: { machine: true },
    any: [1],
    restrictedTypes: [1, 2, 3]
  };
  const obj2 = {
    name: 'min',
    lastName: '      ',
    age: 102,
    items: [1],
    restrictedTypes: true,
    notAllowAvoidTypes: null
  };
  const obj3 = {
    name: 23,
    age: '',
    items: false,
    male: [],
    lastName: 23,
    tools: [1, 2, 3],
    any: 'welcome',
    restrictedTypes: 1,
    notAllowAvoidTypes: undefined
  };
  const obj4 = {
    name: 'welcome to volder npm package',
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    male: false,
    tools: new Object({ home: true }),
    restrictedTypes: 'test'
  };

  expect(validator(volderMap, obj1)).toEqual([true, {}]);
  expect(validator(volderMap, obj2)).toEqual([
    false,
    {
      name: 'name should be at least 10 characters',
      age: 'age should be at most 100',
      male: 'male is required',
      lastName: 'lastName should be at least 1 characters',
      items: 'items should be at least 2 items',
      any: 'any is required',
      notAllowAvoidTypes: 'null and undefined not allowed'
    }
  ]);
  expect(validator(volderMap, obj3)).toEqual([
    false,
    {
      name: 'name should be a string',
      age: 'age should be a number',
      male: 'male should be a boolean (true or false)',
      items: 'items should be an array',
      lastName: 'lastName should be a string',
      tools: 'tools should be an object',
      restrictedTypes: 'Number type not allowed',
      notAllowAvoidTypes: 'null and undefined not allowed'
    }
  ]);
  expect(validator(volderMap, obj4)).toEqual([
    false,
    {
      age: 'age is required',
      items: 'items should be at most 10 items',
      any: 'any is required',
      restrictedTypes: 'String type not allowed'
    }
  ]);
  // without collect the errors;
  expect(validator(volderMap, obj1, false)).toBe(true);
  expect(validator(volderMap, obj2, false)).toBe(false);
  expect(validator(volderMap, obj3, false)).toBe(false);
  expect(validator(volderMap, obj4, false)).toBe(false);
});
