import { validator } from '../src/lib/validator/index';
import { validatorInput } from '../src/lib/validator/validatorInput';
import { Volder } from '../src/lib/volder';

test('validator function should work correctly', () => {
  const { volderMap } = new Volder({
    name: { type: String, min: 10 },
    age: { type: Number, max: 100, required: true },
  });

  const obj1 = { name: 'max and min and welcome', age: 90 };
  const obj2 = { name: 'min', age: 102 };
  const obj3 = { name: 23, age: '' };
  const obj4 = { name: 'welcome to volder npm package' };

  expect(validator(volderMap, obj1)).toEqual([true, {}]);
  expect(validator(volderMap, obj2)).toEqual([
    false,
    {
      name: 'name should be at least 10 characters',
      age: 'age should be at most 100',
    },
  ]);
  expect(validator(volderMap, obj3)).toEqual([
    false,
    {
      name: 'name should be a string',
      age: 'age should be a number',
    },
  ]);
  expect(validator(volderMap, obj4)).toEqual([
    false,
    {
      age: 'age is required',
    },
  ]);
});

test('validatorInput function should work correctly', () => {});
