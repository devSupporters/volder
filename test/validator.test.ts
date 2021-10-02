import { validator } from '../src/lib/validator/index';
import { Volder } from '../src/lib/volder';

test('validator function should work correctly', () => {
  const { volderMap } = new Volder({
    name: { type: String, min: 10 },
    lastName: { type: String, max: 4 },
    age: { type: Number, max: 100, required: true },
    male: { type: Boolean, required: true },
    items: { type: Array, min: 2, max: 10 }
  });

  const obj1 = { name: 'max and min and welcome', age: 90, male: true };
  const obj2 = { name: 'min', lastName: 'none of lastName', age: 102, items: [1] };
  const obj3 = { name: 23, age: '', items: false, male: [], lastName: 23 };
  const obj4 = {
    name: 'welcome to volder npm package',
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    male: false
  };

  expect(validator(volderMap, obj1)).toEqual([true, {}]);
  expect(validator(volderMap, obj2)).toEqual([
    false,
    {
      name: 'name should be at least 10 characters',
      age: 'age should be at most 100',
      lastName: 'lastName should be at most 4 characters',
      male: 'male is required',
      items: 'items should be at least 2 items'
    }
  ]);
  expect(validator(volderMap, obj3)).toEqual([
    false,
    {
      name: 'name should be a string',
      age: 'age should be a number',
      male: 'male should be a boolean',
      items: 'items should be a array',
      lastName: 'lastName should be a string'
    }
  ]);
  expect(validator(volderMap, obj4)).toEqual([
    false,
    {
      age: 'age is required',
      items: 'items should be at most 10 items'
    }
  ]);
});

// write test for inputValidator function here:
