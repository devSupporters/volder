import { Volder } from '../src/index';

test('Volder work correctly', () => {
  const volderSchema = new Volder({
    name: { type: String, min: 4, max: 10, trim: true },
    age: { type: Number, max: 100, required: true, min: 1 },
    email: { type: String, min: 10, max: 150, required: true },
    male: { type: Boolean, required: true },
    tools: { type: Array, required: true, min: 3 },
    items: { type: Object, required: true },
    any: { type: null, min: 2, max: 3 },
    restrictedTypes: { type: null, avoid: [Object, Boolean] },
    type: String,
    nums: Number
  });

  const obj1 = {
    name: 'max cober',
    age: 23,
    email: 'welcome@gmail.com',
    male: true,
    tools: [1, 2, 3],
    items: { one: 1, two: 2 },
    nums: 23
  };
  const obj2 = {
    name: '   max    ',
    age: new Number(0),
    email: 'welcome@gmail.com',
    items: 2,
    any: 'welcome',
    type: 'hello there',
    restrictedTypes: { name: 'max' }
  };
  const obj3 = {
    type: 23,
    name: 'max cober and some text',
    age: 230,
    email: 'gmail.com',
    male: false,
    any: new Number(1)
  };
  const obj4 = {
    nums: 'wrong',
    name: () => {},
    age: false,
    male: 2,
    tools: [1, 2],
    items: [1, 2, 3]
  };

  expect(volderSchema.validate(obj1)).toEqual([true, {}]);
  expect(volderSchema.validate(obj2)).toEqual([
    false,
    {
      name: 'name should be at least 4 characters',
      age: 'age should be at least 1',
      male: 'male is required',
      tools: 'tools is required',
      any: 'any should be at most 3 characters',
      items: 'items should be an object',
      restrictedTypes: 'Object type not allowed'
    }
  ]);
  expect(volderSchema.validate(obj3)).toEqual([
    false,
    {
      type: 'type should be a string',
      age: 'age should be at most 100',
      any: 'any should be at least 2',
      email: 'email should be at least 10 characters',
      tools: 'tools is required',
      name: 'name should be at most 10 characters',
      items: 'items is required'
    }
  ]);
  expect(volderSchema.validate(obj4)).toEqual([
    false,
    {
      nums: 'nums should be a number',
      name: 'name should be a string',
      male: 'male should be a boolean (true or false)',
      email: 'email is required',
      tools: 'tools should be at least 3 items',
      age: 'age should be a number',
      items: 'items should be an object'
    }
  ]);
});

test('volder custom errors', () => {
  const volderSchema = new Volder({
    name: {
      type: [String, 'should be a string type'],
      min: [4, 'min length is 4'],
      max: [10, 'max length is 10'],
      required: [true, 'should be there'],
      trim: true
    },
    age: {
      type: [Number, 'I am must be a number'],
      required: [true, 'shoulde be a there']
    },
    other: {
      type: [null, 'anything without string'],
      avoid: [String]
    }
  });
  expect(
    volderSchema.validate({
      name: 'i am max',
      age: 32
    })
  ).toEqual([true, {}]);
  expect(
    volderSchema.validate({
      name: '123',
      other: 'string type'
    })
  ).toEqual([
    false,
    {
      age: 'shoulde be a there',
      other: 'anything without string',
      name: 'min length is 4'
    }
  ]);
  expect(
    volderSchema.validate({
      name: 'my name is max under the water',
      age: 'i am not a number'
    })
  ).toEqual([
    false,
    {
      age: 'I am must be a number',
      name: 'max length is 10'
    }
  ]);
});

test('custom type function work correctly', () => {
  const isEmail = (input) => input.includes('@');
  const trueValue = (input) => !!input;
  const arrayOfItems = (input) => input.length >= 4;
  const hasProperty = (input) => input.welcome === 'welcome';
  const isNumber = (input) => input.constructor.name === 'Number';
  const invalid = (input) => input.constructor.name;

  const volderSchema = new Volder({
    email: isEmail,
    invalid,
    mustBeTrue: { type: trueValue },
    arrayOfItems: {
      type: [arrayOfItems, 'must be 4 items'],
      max: [5, 'must not bigger than 5']
    },
    haveProperty: {
      type: hasProperty,
      required: true
    },
    isNumber: isNumber
  });
  const obj1 = {
    email: '@',
    arrayOfItems: [1, 2, 3, 4],
    haveProperty: { welcome: 'welcome' },
    isNumber: 23
  };
  expect(volderSchema.validate(obj1)).toEqual([true, {}]);

  const obj2 = {
    email: 'invalid',
    arrayOfItems: [1, 2, 3, 4, 5, 6],
    isNumber: 'string'
  };
  expect(volderSchema.validate(obj2)).toEqual([
    false,
    {
      email: 'email is invalid',
      arrayOfItems: 'must not bigger than 5',
      haveProperty: 'haveProperty is required',
      isNumber: 'isNumber is invalid'
    }
  ]);

  const obj3 = {
    invalid: 'hello'
  };

  expect(() => volderSchema.validate(obj3)).toThrowError(
    new Error(`Expect custom function return a boolean but received string at invalid`)
  );
});

test('nested volders should work correctly', () => {
  const volder1 = new Volder({
    name: {
      type: [String, 'must String']
    },
    age: Number
  });
  const volder2 = new Volder({
    person: volder1
  });
  expect(volder2.validate({ person: { name: 'max', age: 23 } })).toEqual([true, {}]);
  expect(volder2.validate({ person: { name: 23, age: 'max' } })).toEqual([
    false,
    {
      person: { name: 'must String', age: 'age should be a number' }
    }
  ]);
  expect(volder2.validate({ person: 'test' })).toEqual([
    false,
    {
      person: 'person should be an object'
    }
  ]);
});
