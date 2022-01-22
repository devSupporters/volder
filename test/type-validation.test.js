import { Volder } from '../src/index';

test('String type validation', () => {
  const StrSchema = new Volder({
    strType: String,
    strRequired: { type: String, required: true, alphanumeric: false },
    strTrim: { type: String, trim: true, minLength: 3, required: true },
    strMin: { type: String, minLength: 2 },
    strMax: { type: String, maxLength: 10 },
    strDefault: { type: String, default: 'default name' },
    strWhitespace: { type: String, whitespace: false },
    strPattern: { type: String, pattern: (input) => input.includes('gmail'), transform: (input) => input.slice(0) },
    strTransform: { type: String, transform: (input) => input.slice(1, 2) },
    strAlphanumeric: { type: String, alphanumeric: true },
    strMatches1: { type: String, matches: '1' },
    strMatches2: { type: String, matches: /\.(js|jsx)/ },
    strUpper: { type: String, uppercase: true },
    strLower: { type: String, lowercase: true },
    strAllCases: { type: String, lowercase: true, uppercase: true }
  });

  const obj1 = {
    strType: 'test',
    strRequired: 'exists@',
    strTrim: 'here',
    strMin: 'to',
    strMax: 'also to',
    strTrim: 'test',
    strWhitespace: 'noWhitespace',
    strPattern: 'test@gmail.com',
    strTransform: 'max',
    strAlphanumeric: 'america123',
    strMatches2: 'test.js',
    strMatches1: '123',
    strUpper: 'ABCZ',
    strLower: 'abcz',
    strAllCases: '2342@'
  };

  const obj2 = { strType: 23, strRequired: 'exists', strTrim: 'test' };
  const obj3 = { strTrim: 'test' };
  const obj4 = { strMin: '1', strRequired: 'exists', strTrim: 'test' };
  const obj5 = { strMax: '1234456789823', strRequired: 'exists', strTrim: 'test' };
  const obj6 = { strTrim: '                         ', strRequired: 'exists' };
  const obj7 = { strWhitespace: 'my name is salah', strRequired: 'exists', strTrim: 'test' };
  const obj8 = { strPattern: 'test@test.com', strRequired: 'exists', strTrim: 'test' };
  const obj9 = { strAlphanumeric: 'america@123', strRequired: 'exists', strTrim: 'test' };
  const obj10 = { strMatches1: '23', strRequired: 'exists', strTrim: 'test' };
  const obj11 = { strMatches: 'not js', strRequired: 'exists', strTrim: 'test' };
  const obj12 = { strUpper: 'ABCz', strRequired: 'exists', strTrim: 'test' };
  const obj13 = { strLower: 'abcZ', strRequired: 'exists', strTrim: 'test' };

  expect(StrSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, strDefault: 'default name', strTransform: 'a' }
  });
  expect(StrSchema.validate(obj2)).toEqual({
    valid: false,
    errors: {
      strType: 'strType should be a string'
    },
    value: {}
  });
  expect(StrSchema.validate(obj3)).toEqual({
    valid: false,
    errors: {
      strRequired: 'strRequired is required'
    },
    value: {}
  });
  expect(StrSchema.validate(obj4)).toEqual({
    valid: false,
    errors: {
      strMin: 'strMin should be at least 2 length'
    },
    value: {}
  });
  expect(StrSchema.validate(obj5)).toEqual({
    valid: false,
    errors: {
      strMax: 'strMax should be at most 10 length'
    },
    value: {}
  });
  expect(StrSchema.validate(obj6)).toEqual({
    valid: false,
    errors: {
      strTrim: 'strTrim is required'
    },
    value: {}
  });
  expect(StrSchema.validate(obj7)).toEqual({
    valid: false,
    errors: {
      strWhitespace: 'strWhitespace should be without whitespace'
    },
    value: {}
  });
  expect(StrSchema.validate(obj8)).toEqual({
    valid: false,
    errors: {
      strPattern: 'strPattern is not in proper pattern'
    },
    value: {}
  });
  expect(StrSchema.validate(obj9)).toEqual({
    valid: false,
    errors: {
      strAlphanumeric: 'strAlphanumeric is not alphanumeric'
    },
    value: {}
  });
  expect(StrSchema.validate(obj10)).toEqual({
    valid: false,
    errors: {
      strMatches1: 'strMatches1 is not matches regular expression'
    },
    value: {}
  });
  expect(StrSchema.validate(obj12)).toEqual({
    valid: false,
    errors: {
      strUpper: 'strUpper is not in uppercase'
    },
    value: {}
  });
  expect(StrSchema.validate(obj13)).toEqual({
    valid: false,
    errors: {
      strLower: 'strLower is not in lowercase'
    },
    value: {}
  });

  const StrSchemaCustomMessage = new Volder({
    strType: { type: [String, 'str not a string'] },
    strRequired: { type: String, required: [true, 'strRequired must exists'] },
    strTrim: { type: String, trim: true, required: [true, 'should be required'] },
    strMin: { type: String, minLength: [2, 'string min not valid'] },
    strMax: { type: String, maxLength: [10, 'string max not valid'] },
    strDefault: { type: String, default: 'default name' },
    strWhitespace: { type: String, whitespace: [false, 'whitespace is not allowed'] },
    strPattern: { type: String, pattern: [(input) => input.includes('gmail'), 'not valid pattern'] },
    strAlphanumeric: { type: String, alphanumeric: [true, 'must only includes 0-9, a-z and A-Z'] },
    strMatches: { type: String, matches: [/\.(js|jsx)$/, 'not valid expression'] },
    strUpper: { type: String, uppercase: [true, 'should be in uppercase'] },
    strLower: { type: String, lowercase: [true, 'should be in lowercase'] }
  });

  expect(StrSchemaCustomMessage.valid(obj1)).toBe(true);
  expect(StrSchemaCustomMessage.valid(obj2)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj3)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj4)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj5)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj6)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj7)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj8)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj9)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj11)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj12)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj13)).toBe(false);

  expect(StrSchemaCustomMessage.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, strDefault: 'default name' }
  });
  expect(StrSchemaCustomMessage.validate(obj2)).toEqual({
    valid: false,
    errors: {
      strType: 'str not a string'
    },
    value: {}
  });
  expect(StrSchemaCustomMessage.validate(obj3)).toEqual({
    valid: false,
    errors: {
      strRequired: 'strRequired must exists'
    },
    value: {}
  });
  expect(StrSchemaCustomMessage.validate(obj4)).toEqual({
    valid: false,
    errors: {
      strMin: 'string min not valid'
    },
    value: {}
  });
  expect(StrSchemaCustomMessage.validate(obj5)).toEqual({
    valid: false,
    errors: {
      strMax: 'string max not valid'
    },
    value: {}
  });

  expect(StrSchemaCustomMessage.validate(obj6)).toEqual({
    valid: false,
    errors: {
      strTrim: 'should be required'
    },
    value: {}
  });
  expect(StrSchemaCustomMessage.validate(obj7)).toEqual({
    valid: false,
    errors: {
      strWhitespace: 'whitespace is not allowed'
    },
    value: {}
  });
  expect(StrSchemaCustomMessage.validate(obj8)).toEqual({
    valid: false,
    errors: {
      strPattern: 'not valid pattern'
    },
    value: {}
  });
  expect(StrSchemaCustomMessage.validate(obj9)).toEqual({
    valid: false,
    errors: {
      strAlphanumeric: 'must only includes 0-9, a-z and A-Z'
    },
    value: {}
  });
  expect(StrSchemaCustomMessage.validate(obj11)).toEqual({
    valid: false,
    errors: {
      strMatches: 'not valid expression'
    },
    value: {}
  });
  expect(StrSchemaCustomMessage.validate(obj12)).toEqual({
    valid: false,
    errors: {
      strUpper: 'should be in uppercase'
    },
    value: {}
  });
  expect(StrSchemaCustomMessage.validate(obj13)).toEqual({
    valid: false,
    errors: {
      strLower: 'should be in lowercase'
    },
    value: {}
  });
});

test('Number type validation', () => {
  const NumSchema = new Volder({
    NumType: Number,
    NumRequired: { type: Number, required: true },
    NumMin: { type: Number, min: 3 },
    NumMax: { type: Number, max: 100 },
    NumDefault: { type: Number, default: 100 },
    NumPattern: { type: Number, pattern: (input) => input % 2 === 0 },
    NumTransform: { type: Number, transform: (input) => input / 2 },
    NumInteger: { type: Number, integer: true },
    NumFloat: { type: Number, float: true },
    NumRound: { type: Number, round: true },
    NumFixed: { type: Number, fixed: 2 },
    NumSign: { type: Number, sign: 'positive' },
    NumSign1: { type: Number, sign: 'negative' }
  });

  const obj1 = {
    NumType: 23,
    NumRequired: 100,
    NumMin: 33,
    NumMax: 100,
    NumPattern: 120,
    NumTransform: 3,
    NumInteger: 113,
    NumFloat: 12.34,
    NumRound: 1.4,
    NumFixed: 23.232423,
    NumSign: 1,
    NumSign1: -1
  };
  const obj2 = { NumType: 'string', NumRequired: 100 };
  const obj3 = {};
  const obj4 = { NumMin: 1, NumRequired: 100 };
  const obj5 = { NumMax: 101, NumRequired: 100 };
  const obj6 = { NumPattern: 101, NumRequired: 100 };
  const obj7 = { NumInteger: -13.3, NumRequired: 100 };
  const obj8 = { NumFloat: -13, NumRequired: 100 };
  const obj9 = { NumSign: -2, NumRequired: 100 };

  expect(NumSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, NumDefault: 100, NumTransform: 1.5, NumRound: 1, NumFixed: 23.23 }
  });
  expect(NumSchema.validate(obj2)).toEqual({
    valid: false,
    errors: {
      NumType: 'NumType should be a number'
    },
    value: {}
  });
  expect(NumSchema.validate(obj3)).toEqual({
    valid: false,
    errors: {
      NumRequired: 'NumRequired is required'
    },
    value: {}
  });
  expect(NumSchema.validate(obj4)).toEqual({
    valid: false,
    errors: {
      NumMin: 'NumMin should be at least 3'
    },
    value: {}
  });
  expect(NumSchema.validate(obj5)).toEqual({
    valid: false,
    errors: {
      NumMax: 'NumMax should be at most 100'
    },
    value: {}
  });
  expect(NumSchema.validate(obj6)).toEqual({
    valid: false,
    errors: {
      NumPattern: 'NumPattern is not in proper pattern'
    },
    value: {}
  });
  expect(NumSchema.validate(obj7)).toEqual({
    valid: false,
    errors: {
      NumInteger: 'NumInteger should be an Integer type'
    },
    value: {}
  });
  expect(NumSchema.validate(obj8)).toEqual({
    valid: false,
    errors: {
      NumFloat: 'NumFloat should be an Float type'
    },
    value: {}
  });
  expect(NumSchema.validate(obj9)).toEqual({
    valid: false,
    errors: {
      NumSign: 'NumSign should be a positive number'
    },
    value: {}
  });

  const NumSchemaErrorMessage = new Volder({
    NumType: { type: [Number, 'should be a number type'] },
    NumRequired: { type: Number, required: [true, 'must exists'] },
    NumMin: { type: Number, min: [3, 'the min is 3'] },
    NumMax: { type: Number, max: [100, 'the max is 100'] },
    NumDefault: { type: Number, default: 100 },
    NumPattern: { type: Number, pattern: [(input) => input % 2 === 0, 'not valid pattern'] },
    NumInteger: { type: Number, integer: [true, 'not be in float'] },
    NumFloat: { type: Number, float: [true, 'not be in integer'] },
    NumSign: { type: Number, sign: ['positive', 'only pos'] }
  });

  expect(NumSchemaErrorMessage.valid(obj1)).toBe(true);
  expect(NumSchemaErrorMessage.valid(obj2)).toBe(false);
  expect(NumSchemaErrorMessage.valid(obj3)).toBe(false);
  expect(NumSchemaErrorMessage.valid(obj4)).toBe(false);
  expect(NumSchemaErrorMessage.valid(obj5)).toBe(false);
  expect(NumSchemaErrorMessage.valid(obj6)).toBe(false);
  expect(NumSchemaErrorMessage.valid(obj7)).toBe(false);
  expect(NumSchemaErrorMessage.valid(obj8)).toBe(false);
  expect(NumSchemaErrorMessage.valid(obj9)).toBe(false);

  expect(NumSchemaErrorMessage.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, NumDefault: 100 }
  });
  expect(NumSchemaErrorMessage.validate(obj2)).toEqual({
    valid: false,
    errors: {
      NumType: 'should be a number type'
    },
    value: {}
  });
  expect(NumSchemaErrorMessage.validate(obj3)).toEqual({
    valid: false,
    errors: {
      NumRequired: 'must exists'
    },
    value: {}
  });
  expect(NumSchemaErrorMessage.validate(obj4)).toEqual({
    valid: false,
    errors: {
      NumMin: 'the min is 3'
    },
    value: {}
  });
  expect(NumSchemaErrorMessage.validate(obj5)).toEqual({
    valid: false,
    errors: {
      NumMax: 'the max is 100'
    },
    value: {}
  });
  expect(NumSchemaErrorMessage.validate(obj6)).toEqual({
    valid: false,
    errors: {
      NumPattern: 'not valid pattern'
    },
    value: {}
  });
  expect(NumSchemaErrorMessage.validate(obj7)).toEqual({
    valid: false,
    errors: {
      NumInteger: 'not be in float'
    },
    value: {}
  });
  expect(NumSchemaErrorMessage.validate(obj8)).toEqual({
    valid: false,
    errors: {
      NumFloat: 'not be in integer'
    },
    value: {}
  });
  expect(NumSchemaErrorMessage.validate(obj9)).toEqual({
    valid: false,
    errors: {
      NumSign: 'only pos'
    },
    value: {}
  });
});

test('Array type validation', () => {
  const ArrSchema = new Volder({
    arrType: Array,
    arrRequired: { type: Array, required: true },
    arrMin: { type: Array, minLength: 3 },
    arrMax: { type: Array, maxLength: 5 },
    arrDefault: { type: Array, default: [1, 2, 3] },
    arrPattern: { type: Array, pattern: (input) => input.includes(1) },
    arrTransform: { type: Array, transform: (input) => input.join(',') },
    arrOf: { type: Array, arrayOf: Boolean },
    arrOf1: { type: Array, arrayOf: undefined },
    arrOf2: { type: Array, arrayOf: null },
    arrUnique: { type: Array, unique: true }
  });

  const obj1 = {
    arrType: [1, 3],
    arrRequired: ['exists'],
    arrMax: [1, 2, 3, 4, 5],
    arrMin: [1, 2, 3],
    arrPattern: [1, 2, 3],
    arrTransform: [2, 1, 0],
    arrOf: [true, false, true],
    arrOf1: [null, null],
    arrOf2: [undefined, undefined],
    arrUnique: [1, 2, 'welcome', { name: 'max' }, { name: 'max' }]
  };
  const obj2 = { arrType: true, arrRequired: ['exists'] };
  const obj3 = {};
  const obj4 = { arrMax: [1, 2, 3, 4, 5, 6], arrRequired: ['exists'] };
  const obj5 = { arrMin: [1, 2], arrRequired: ['exists'] };
  const obj6 = { arrPattern: [2, 3], arrRequired: ['exists'] };
  const obj7 = { arrOf: [false, true, 'string'], arrRequired: ['exists'] };
  const obj8 = { arrUnique: [1, 'welcome', 3, 1], arrRequired: ['exists'] };

  expect(ArrSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, arrDefault: [1, 2, 3], arrTransform: '2,1,0' }
  });
  expect(ArrSchema.validate(obj2)).toEqual({
    valid: false,
    errors: {
      arrType: 'arrType should be an array'
    },
    value: {}
  });
  expect(ArrSchema.validate(obj3)).toEqual({
    valid: false,
    errors: {
      arrRequired: 'arrRequired is required'
    },
    value: {}
  });
  expect(ArrSchema.validate(obj4)).toEqual({
    valid: false,
    errors: {
      arrMax: 'arrMax should be at most 5 length'
    },
    value: {}
  });
  expect(ArrSchema.validate(obj5)).toEqual({
    valid: false,
    errors: {
      arrMin: 'arrMin should be at least 3 length'
    },
    value: {}
  });

  expect(ArrSchema.validate(obj6)).toEqual({
    valid: false,
    errors: {
      arrPattern: 'arrPattern is not in proper pattern'
    },
    value: {}
  });
  expect(ArrSchema.validate(obj7)).toEqual({
    valid: false,
    errors: {
      arrOf: 'arrOf is not accpted type depening in arrayOf config'
    },
    value: {}
  });
  expect(ArrSchema.validate(obj8)).toEqual({
    valid: false,
    errors: {
      arrUnique: 'arrUnique is not have unique items'
    },
    value: {}
  });

  const ArrSchemaErrorMessage = new Volder({
    arrType: { type: [Array, 'just array type'] },
    arrRequired: { type: Array, required: [true, 'should be exists'] },
    arrMin: { type: Array, minLength: [3, 'the min length is 3'] },
    arrMax: { type: Array, maxLength: [5, 'the max length is 5'] },
    arrDefault: { type: Array, default: [1, 2, 3] },
    arrPattern: { type: Array, pattern: [(input) => input.includes(1), 'not valid pattern'] },
    arrOf: { type: Array, arrayOf: [Boolean, 'just we need Boolean array'] },
    arrUnique: { type: Array, unique: [true, 'must be unique'] }
  });

  expect(ArrSchemaErrorMessage.valid(obj1)).toBe(true);
  expect(ArrSchemaErrorMessage.valid(obj2)).toBe(false);
  expect(ArrSchemaErrorMessage.valid(obj3)).toBe(false);
  expect(ArrSchemaErrorMessage.valid(obj4)).toBe(false);
  expect(ArrSchemaErrorMessage.valid(obj5)).toBe(false);
  expect(ArrSchemaErrorMessage.valid(obj6)).toBe(false);
  expect(ArrSchemaErrorMessage.valid(obj7)).toBe(false);
  expect(ArrSchemaErrorMessage.valid(obj8)).toBe(false);

  expect(ArrSchemaErrorMessage.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, arrDefault: [1, 2, 3] }
  });
  expect(ArrSchemaErrorMessage.validate(obj2)).toEqual({
    valid: false,
    errors: {
      arrType: 'just array type'
    },
    value: {}
  });
  expect(ArrSchemaErrorMessage.validate(obj3)).toEqual({
    valid: false,
    errors: {
      arrRequired: 'should be exists'
    },
    value: {}
  });
  expect(ArrSchemaErrorMessage.validate(obj4)).toEqual({
    valid: false,
    errors: {
      arrMax: 'the max length is 5'
    },
    value: {}
  });
  expect(ArrSchemaErrorMessage.validate(obj5)).toEqual({
    valid: false,
    errors: {
      arrMin: 'the min length is 3'
    },
    value: {}
  });
  expect(ArrSchemaErrorMessage.validate(obj6)).toEqual({
    valid: false,
    errors: {
      arrPattern: 'not valid pattern'
    },
    value: {}
  });
  expect(ArrSchemaErrorMessage.validate(obj7)).toEqual({
    valid: false,
    errors: {
      arrOf: 'just we need Boolean array'
    },
    value: {}
  });
  expect(ArrSchemaErrorMessage.validate(obj8)).toEqual({
    valid: false,
    errors: {
      arrUnique: 'must be unique'
    },
    value: {}
  });
});

test('Object type validation', () => {
  const ObjSchema = new Volder({
    objType: Object,
    objRequired: { type: Object, required: true },
    objDefault: { type: Object, default: { name: 'default' } },
    objPattern: { type: Object, pattern: (input) => input.hasOwnProperty('name') },
    objTransform: { type: Object, transform: (input) => input.person },
    objInstance: { type: Object, instance: Volder },
    objWith: { type: Object, with: ['name', 'age'] },
    objWithout: { type: Object, without: ['gender'] },
    objStrict: { type: Object, strict: ['name'] },
    objStrict1: { type: Object, strict: ['name'] }
  });

  const obj1 = {
    objType: { name: 'max' },
    objRequired: { here: true },
    objPattern: { name: 'max' },
    objTransform: { person: { name: 'max', age: 23 } },
    objWith: { name: 'max', age: 23 },
    objWithout: { name: 'max' },
    objStrict1: { name: 'max' }
  };
  const obj2 = { objType: 'string', objRequired: { here: true } };
  const obj3 = {};
  const obj4 = { objPattern: { person: 'max' }, objRequired: { here: true } };
  const obj5 = { objInstance: { name: 'max' }, objRequired: { here: true } };
  const obj6 = { objWith: { name: 'max' }, objRequired: { here: true } };
  const obj7 = { objWithout: { name: 'max', gender: 'male' }, objRequired: { here: true } };
  const obj8 = { objStrict: { age: 23 }, objRequired: { here: true } };

  expect(ObjSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: {
      ...obj1,
      objDefault: { name: 'default' },
      objTransform: { name: 'max', age: 23 }
    }
  });
  expect(ObjSchema.validate(obj2)).toEqual({
    valid: false,
    errors: {
      objType: 'objType should be an object'
    },
    value: {}
  });
  expect(ObjSchema.validate(obj3)).toEqual({
    valid: false,
    errors: {
      objRequired: 'objRequired is required'
    },
    value: obj3
  });

  expect(ObjSchema.validate(obj4)).toEqual({
    valid: false,
    errors: {
      objPattern: 'objPattern is not in proper pattern'
    },
    value: obj3
  });
  expect(ObjSchema.validate(obj5)).toEqual({
    valid: false,
    errors: {
      objInstance: 'objInstance is not instance of selected constructor'
    },
    value: obj3
  });
  expect(ObjSchema.validate(obj6)).toEqual({
    valid: false,
    errors: {
      objWith: 'objWith has missed keys required to include'
    },
    value: obj3
  });
  expect(ObjSchema.validate(obj7)).toEqual({
    valid: false,
    errors: {
      objWithout: 'objWithout has keys are not allowed to include'
    },
    value: obj3
  });
  expect(ObjSchema.validate(obj8)).toEqual({
    valid: false,
    errors: {
      objStrict: 'objStrict is matches strict config'
    },
    value: obj3
  });

  const ObjSchemaErrorMessage = new Volder({
    objType: { type: [Object, 'the valid is object'] },
    objRequired: { type: Object, required: [true, 'should be exists'] },
    objDefault: { type: Object, default: { name: 'default' } },
    objPattern: { type: Object, pattern: [(input) => input.hasOwnProperty('name'), 'not have name prop'] },
    objInstance: { type: Object, instance: [Volder, 'should be instance of Volder'] },
    objWith: { type: Object, with: ['name', 'age'], withErrorMessage: 'should all to be included' },
    objWithout: { type: Object, without: ['gender'], withoutErrorMessage: 'gender not allowed' },
    objStrict: { type: Object, strict: ['name', 'age'], strictErrorMessage: 'age not included' },
    objStrict1: { type: Object, strict: ['name'] }
  });
  expect(ObjSchemaErrorMessage.valid(obj1)).toBe(true);
  expect(ObjSchemaErrorMessage.valid(obj2)).toBe(false);
  expect(ObjSchemaErrorMessage.valid(obj3)).toBe(false);
  expect(ObjSchemaErrorMessage.valid(obj4)).toBe(false);
  expect(ObjSchemaErrorMessage.valid(obj5)).toBe(false);
  expect(ObjSchemaErrorMessage.valid(obj6)).toBe(false);
  expect(ObjSchemaErrorMessage.valid(obj7)).toBe(false);
  expect(ObjSchemaErrorMessage.valid(obj8)).toBe(false);

  expect(ObjSchemaErrorMessage.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, objDefault: { name: 'default' } }
  });
  expect(ObjSchemaErrorMessage.validate(obj2)).toEqual({
    valid: false,
    errors: {
      objType: 'the valid is object'
    },
    value: {}
  });
  expect(ObjSchemaErrorMessage.validate(obj3)).toEqual({
    valid: false,
    errors: {
      objRequired: 'should be exists'
    },
    value: {}
  });
  expect(ObjSchemaErrorMessage.validate(obj4)).toEqual({
    valid: false,
    errors: {
      objPattern: 'not have name prop'
    },
    value: {}
  });
  expect(ObjSchemaErrorMessage.validate(obj5)).toEqual({
    valid: false,
    errors: {
      objInstance: 'should be instance of Volder'
    },
    value: {}
  });
  expect(ObjSchemaErrorMessage.validate(obj6)).toEqual({
    valid: false,
    errors: {
      objWith: 'should all to be included'
    },
    value: {}
  });
  expect(ObjSchemaErrorMessage.validate(obj7)).toEqual({
    valid: false,
    errors: {
      objWithout: 'gender not allowed'
    },
    value: {}
  });
  expect(ObjSchemaErrorMessage.validate(obj8)).toEqual({
    valid: false,
    errors: {
      objStrict: 'age not included'
    },
    value: {}
  });
});

test('boolean type validation', () => {
  const BoolSchema = new Volder({
    boolType: Boolean,
    boolRequired: { type: Boolean, required: true },
    boolDefault: { type: Boolean, default: false },
    boolPattern: { type: Boolean, pattern: (input) => input },
    boolTransform: { type: Boolean, transform: (input) => !input },
    boolSensible: { type: Boolean, sensible: true },
    boolState1: { type: Boolean, state: true },
    boolState2: { type: Boolean, state: false, sensible: true },
    boolState3: { type: Boolean, state: true, sensible: true },
    boolSwitch: { type: Boolean, switch: true }
  });

  const obj1 = {
    boolType: false,
    boolRequired: true,
    boolPattern: true,
    boolTransform: false,
    boolSensible: 'true',
    boolState1: true,
    boolState2: 0,
    boolState3: 'name',
    boolSwitch: 'max'
  };
  const obj2 = { boolType: [1, 3, 3], boolRequired: true };
  const obj3 = {};
  const obj4 = { boolPattern: false, boolRequired: true };
  const obj5 = { boolState1: false, boolState2: 1, boolState3: '', boolRequired: true };

  expect(BoolSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, boolDefault: false, boolTransform: true, boolSwitch: true }
  });
  expect(BoolSchema.validate(obj2)).toEqual({
    valid: false,
    errors: {
      boolType: 'boolType should be a boolean (true or false)'
    },
    value: {}
  });
  expect(BoolSchema.validate(obj3)).toEqual({
    valid: false,
    errors: {
      boolRequired: 'boolRequired is required'
    },
    value: {}
  });
  expect(BoolSchema.validate(obj4)).toEqual({
    valid: false,
    errors: {
      boolPattern: 'boolPattern is not in proper pattern'
    },
    value: {}
  });
  expect(BoolSchema.validate(obj5)).toEqual({
    valid: false,
    errors: {
      boolState1: 'boolState1 should be a true value',
      boolState2: 'boolState2 should be a Falsy value',
      boolState3: 'boolState3 should be a Truthy value'
    },
    value: {}
  });

  const BoolSchemaErrorMessage = new Volder({
    boolType: { type: [Boolean, 'must true or false'] },
    boolRequired: { type: Boolean, required: [true, 'boolean is empty'] },
    boolDefault: { type: Boolean, default: false },
    boolPattern: { type: Boolean, pattern: [(input) => input, 'is not true'] },
    boolState1: { type: Boolean, state: [true, 'only true'] },
    boolState2: { type: Boolean, state: [false, 'just Falsy value accepted'], sensible: true }
  });

  expect(BoolSchemaErrorMessage.valid(obj1)).toBe(true);
  expect(BoolSchemaErrorMessage.valid(obj2)).toBe(false);
  expect(BoolSchemaErrorMessage.valid(obj3)).toBe(false);
  expect(BoolSchemaErrorMessage.valid(obj4)).toBe(false);
  expect(BoolSchemaErrorMessage.valid(obj5)).toBe(false);

  expect(BoolSchemaErrorMessage.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, boolDefault: false }
  });
  expect(BoolSchemaErrorMessage.validate(obj2)).toEqual({
    valid: false,
    errors: {
      boolType: 'must true or false'
    },
    value: {}
  });
  expect(BoolSchemaErrorMessage.validate(obj3)).toEqual({
    valid: false,
    errors: {
      boolRequired: 'boolean is empty'
    },
    value: {}
  });
  expect(BoolSchemaErrorMessage.validate(obj4)).toEqual({
    valid: false,
    errors: {
      boolPattern: 'is not true'
    },
    value: {}
  });
  expect(BoolSchemaErrorMessage.validate(obj5)).toEqual({
    valid: false,
    errors: {
      boolState1: 'only true',
      boolState2: 'just Falsy value accepted'
    },
    value: {}
  });
});

test('null type validation', () => {
  const NullSchema = new Volder({
    nullType: null,
    nullRequired: { type: null, required: true },
    nullAvoid: { type: null, avoid: [null, String, Boolean] },
    nullDefault: { type: null, default: null },
    nullPattern: { type: null, pattern: (input) => typeof input === 'number' },
    nullAddtion: null,
    nullTransform: { type: null, transform: (input) => !!input }
  });

  const obj1 = {
    nullType: () => true,
    nullRequired: 'is required',
    nullAvoid: 23,
    nullPattern: 1,
    nullAddtion: { name: 'max' },
    nullTransform: 1
  };
  const obj2 = {};
  const obj3 = { nullAvoid: true, nullRequired: false };
  const obj4 = { nullPattern: () => true, nullRequired: false };

  expect(NullSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, nullDefault: null, nullTransform: true }
  });
  expect(NullSchema.validate(obj2)).toEqual({
    valid: false,
    errors: {
      nullRequired: 'nullRequired is required'
    },
    value: {}
  });
  expect(NullSchema.validate(obj3)).toEqual({
    valid: false,
    errors: {
      nullAvoid: 'Boolean type not allowed'
    },
    value: {}
  });
  expect(NullSchema.validate(obj4)).toEqual({
    valid: false,
    errors: {
      nullPattern: 'nullPattern is not in proper pattern'
    },
    value: {}
  });

  const NullSchemaErrorMessage = new Volder({
    nullType: null,
    nullRequired: { type: null, required: [true, 'null required must exists'] },
    nullAvoid: { type: [null, 'null string boolean type not valid'], avoid: [null, String, Boolean] },
    nullDefault: { type: null, default: null },
    nullPattern: { type: null, pattern: [(input) => typeof input === 'number', 'not a number'] }
  });

  expect(NullSchemaErrorMessage.valid(obj1)).toBe(true);
  expect(NullSchemaErrorMessage.valid(obj2)).toBe(false);
  expect(NullSchemaErrorMessage.valid(obj3)).toBe(false);
  expect(NullSchemaErrorMessage.valid(obj4)).toBe(false);

  expect(NullSchemaErrorMessage.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, nullDefault: null }
  });
  expect(NullSchemaErrorMessage.validate(obj2)).toEqual({
    valid: false,
    errors: {
      nullRequired: 'null required must exists'
    },
    value: {}
  });

  obj3.nullAvoid = null;
  expect(NullSchemaErrorMessage.validate(obj3)).toEqual({
    valid: false,
    errors: {
      nullAvoid: 'null string boolean type not valid'
    },
    value: {}
  });
  expect(NullSchemaErrorMessage.validate(obj4)).toEqual({
    valid: false,
    errors: {
      nullPattern: 'not a number'
    },
    value: {}
  });
});

test('custom function type validation', () => {
  const includesGmail = (input) => input.includes('gmail');
  const CustomFunctionSchema = new Volder({
    funcType: includesGmail,
    funcAddition: (input) => typeof input === 'boolean',
    funcRequired: { type: includesGmail, required: true },
    functionDefault: { type: includesGmail, default: 'test@gmail.com' },
    funcPattern: { type: (input = true) => true, pattern: (input) => typeof input === 'string' },
    funcAddtion2: (input) => typeof input === 'function',
    funcTransform: { type: (input) => typeof input === 'string', transform: (input) => 'MR.' + input }
  });

  const obj1 = {
    funcType: 'i am have gmail',
    funcRequired: 'i have gmail',
    funcPattern: 'gmail@',
    funcAddition: true,
    funcAddtion2: String,
    funcTransform: 'max'
  };
  const obj2 = { funcType: 'not have', funcRequired: 'i have gmail' };
  const obj3 = {};
  const obj4 = { funcRequired: 'gmail', funcPattern: () => true };

  expect(CustomFunctionSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, functionDefault: 'test@gmail.com', funcTransform: 'MR.max' }
  });
  expect(CustomFunctionSchema.validate(obj2)).toEqual({
    valid: false,
    errors: {
      funcType: 'funcType is invalid'
    },
    value: {}
  });
  expect(CustomFunctionSchema.validate(obj3)).toEqual({
    valid: false,
    errors: {
      funcRequired: 'funcRequired is required'
    },
    value: {}
  });

  expect(CustomFunctionSchema.validate(obj4)).toEqual({
    valid: false,
    errors: {
      funcPattern: 'funcPattern is not in proper pattern'
    },
    value: {}
  });

  const CustomFunctionSchemaErrorMessage = new Volder({
    funcType: { type: [includesGmail, 'should include gmail'] },
    funcRequired: { type: includesGmail, required: [true, 'must exists'] },
    functionDefault: { type: includesGmail, default: 'test@gmail.com' },
    funcPattern: { type: (input = true) => true, pattern: [(input) => typeof input === 'string', 'is not have @'] }
  });

  expect(CustomFunctionSchemaErrorMessage.valid(obj1)).toBe(true);
  expect(CustomFunctionSchemaErrorMessage.valid(obj2)).toBe(false);
  expect(CustomFunctionSchemaErrorMessage.valid(obj3)).toBe(false);
  expect(CustomFunctionSchemaErrorMessage.valid(obj4)).toBe(false);

  expect(CustomFunctionSchemaErrorMessage.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, functionDefault: 'test@gmail.com' }
  });
  expect(CustomFunctionSchemaErrorMessage.validate(obj2)).toEqual({
    valid: false,
    errors: {
      funcType: 'should include gmail'
    },
    value: {}
  });
  expect(CustomFunctionSchemaErrorMessage.validate(obj3)).toEqual({
    valid: false,
    errors: {
      funcRequired: 'must exists'
    },
    value: {}
  });
  expect(CustomFunctionSchemaErrorMessage.validate(obj4)).toEqual({
    valid: false,
    errors: {
      funcPattern: 'is not have @'
    },
    value: {}
  });
});

test('Date type validation', () => {
  const DateSchema = new Volder({
    date: Date,
    dateType: { type: Date },
    dateType2: { type: Date }
  });

  const obj1 = { date: ['1', '2', '2404'], dateType: '1/2/1601' };
  const obj2 = { dateType: '2/30/1004', date: ['33', '12', '1600'], dateType2: '12/12/800' };
  expect(DateSchema.validate(obj1)).toEqual({ valid: true, errors: {}, value: obj1 });
  expect(DateSchema.validate(obj2)).toEqual({
    valid: false,
    errors: {
      dateType: "dateType is not valid date, date should be in 'mm/dd/yyyy' format",
      date: "date is not valid date, date should be in 'mm/dd/yyyy' format",
      dateType2: "dateType2 is not valid date, date should be in 'mm/dd/yyyy' format"
    },
    value: {}
  });

  const DateSchemaErrorMessage = new Volder({
    date: { type: [Date, 'is not valid Date'] }
  });

  expect(DateSchemaErrorMessage.valid(obj1)).toBe(true);
  expect(DateSchemaErrorMessage.valid(obj2)).toBe(false);

  expect(DateSchemaErrorMessage.validate(obj1)).toEqual({ valid: true, errors: {}, value: obj1 });
  expect(DateSchemaErrorMessage.validate(obj2)).toEqual({
    valid: false,
    errors: {
      date: 'is not valid Date'
    },
    value: {}
  });
});
