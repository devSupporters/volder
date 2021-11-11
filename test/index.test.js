import { Volder } from '../src/index';

test('Volder Schme work correctly', () => {
  const volderSchema = new Volder({
    name: { type: String, minLength: 4, max: 10, trim: true },
    age: { type: Number, max: 100, required: true, min: 1 },
    email: { type: String, minLength: 10, max: 150, required: true },
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

  expect(volderSchema.validate(obj1)).toEqual({ valid: true, errors: {}, value: obj1 });
  expect(volderSchema.validate(obj2)).toEqual({
    valid: false,
    errors: {
      name: 'name should be at least 4 length',
      age: 'age should be at least 1',
      male: 'male is required',
      tools: 'tools is required',
      any: 'any should be at most 3 characters',
      items: 'items should be an object',
      restrictedTypes: 'Object type not allowed'
    },
    value: {}
  });
  expect(volderSchema.validate(obj3)).toEqual({
    valid: false,
    errors: {
      type: 'type should be a string',
      age: 'age should be at most 100',
      any: 'any should be at least 2',
      email: 'email should be at least 10 length',
      tools: 'tools is required',
      name: 'name should be at most 10 characters',
      items: 'items is required'
    },
    value: {}
  });
  expect(volderSchema.validate(obj4)).toEqual({
    valid: false,
    errors: {
      nums: 'nums should be a number',
      name: 'name should be a string',
      male: 'male should be a boolean (true or false)',
      email: 'email is required',
      tools: 'tools should be at least 3 items',
      age: 'age should be a number',
      items: 'items should be an object'
    },
    value: {}
  });
  expect(volderSchema.valid(obj1)).toBe(true);
  expect(volderSchema.valid(obj2)).toBe(false);
  expect(volderSchema.valid(obj3)).toBe(false);
  expect(volderSchema.valid(obj4)).toBe(false);
});

test('volder custom errors', () => {
  const volderSchema = new Volder({
    name: {
      type: [String, 'should be a string type'],
      minLength: [4, 'min length is 4'],
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

  const obj1 = { name: 'i am max', age: 32 };
  const obj2 = { name: '123', other: 'string type' };
  const obj3 = { name: 'my name is max under the water', age: 'i am not a number' };
  expect(volderSchema.validate(obj1)).toEqual({ valid: true, errors: {}, value: obj1 });
  expect(volderSchema.validate(obj2)).toEqual({
    valid: false,
    errors: {
      age: 'shoulde be a there',
      other: 'anything without string',
      name: 'min length is 4'
    },
    value: {}
  });
  expect(volderSchema.validate(obj3)).toEqual({
    valid: false,
    errors: {
      age: 'I am must be a number',
      name: 'max length is 10'
    },
    value: {}
  });
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
  const obj2 = {
    email: 'invalid',
    arrayOfItems: [1, 2, 3, 4, 5, 6],
    isNumber: 'string'
  };
  expect(volderSchema.validate(obj1)).toEqual({ valid: true, errors: {}, value: obj1 });

  expect(volderSchema.validate(obj2)).toEqual({
    valid: false,
    errors: {
      email: 'email is invalid',
      arrayOfItems: 'must not bigger than 5',
      haveProperty: 'haveProperty is required',
      isNumber: 'isNumber is invalid'
    },
    value: {}
  });

  expect(volderSchema.valid(obj1)).toBe(true);
  expect(volderSchema.valid(obj2)).toBe(false);

  const obj3 = { invalid: 'hello' };

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
  expect(volder2.validate({ person: { name: 'max', age: 23 } })).toEqual({
    valid: true,
    errors: {},
    value: { person: { name: 'max', age: 23 } }
  });
  expect(volder2.validate({ person: { name: 23, age: 'max' } })).toEqual({
    valid: false,
    errors: {
      person: { name: 'must String', age: 'age should be a number' }
    },
    value: {}
  });
  expect(volder2.validate({ person: 'test' })).toEqual({
    valid: false,
    errors: {
      person: 'person should be an object'
    },
    value: {}
  });
  expect(volder2.valid({ person: { name: 'max', age: 23 } })).toBe(true);
  expect(volder2.valid({ person: { name: 23, age: 'max' } })).toBe(false);
  expect(volder2.valid({ person: 'test' })).toBe(false);
});
