import Volder from '../src/index';

test('Volder work correctly', () => {
  const volderSchema = new Volder({
    name: { type: String, min: 4, max: 10 },
    age: { type: Number, max: 100, required: true, min: 1 },
    email: { type: String, min: 10, max: 150, required: true },
    male: { type: Boolean, required: true },
    tools: { type: Array, required: true, min: 3 },
    items: { type: Object, required: true },
    any: { type: null }
  });

  const obj1 = {
    name: 'max cober',
    age: 23,
    email: 'welcome@gmail.com',
    male: true,
    tools: [1, 2, 3],
    items: { one: 1, two: 2 }
  };
  const obj2 = {
    name: 'max',
    age: new Number(0),
    email: 'welcome@gmail.com',
    items: 2,
    any: 'welcome'
  };
  const obj3 = {
    name: 'max cober and some text',
    age: 230,
    email: 'gmail.com',
    male: false,
    any: new Number(3)
  };
  const obj4 = { name: () => {}, age: false, male: 2, tools: [1, 2], items: [1, 2, 3] };

  expect(volderSchema.validate(obj1)).toEqual([true, {}]);
  expect(volderSchema.validate(obj2)).toEqual([
    false,
    {
      name: 'name should be at least 4 characters',
      age: 'age should be at least 1',
      male: 'male is required',
      tools: 'tools is required',
      items: 'items should be an object'
    }
  ]);
  expect(volderSchema.validate(obj3)).toEqual([
    false,
    {
      age: 'age should be at most 100',
      email: 'email should be at least 10 characters',
      tools: 'tools is required',
      name: 'name should be at most 10 characters',
      items: 'items is required'
    }
  ]);
  expect(volderSchema.validate(obj4)).toEqual([
    false,
    {
      name: 'name should be a string',
      male: 'male should be a boolean (true or false)',
      email: 'email is required',
      tools: 'tools should be at least 3 items',
      age: 'age should be a number',
      items: 'items should be an object'
    }
  ]);
});
