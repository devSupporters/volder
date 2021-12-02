import { Volder } from '../src/index';

test('String type validation', () => {
  const StrSchema = new Volder({
    strType: String,
    strRequired: { type: String, required: true },
    strTrim: { type: String, trim: true, minLength: 3, required: true },
    strMin: { type: String, minLength: 2 },
    strMax: { type: String, maxLength: 10 },
    strDefault: { type: String, default: 'default name' },
    strWhitespace: { type: String, whitespace: false },
    strPattern: { type: String, pattern: (input) => input.includes('gmail') }
  });

  const obj1 = {
    strType: 'test',
    strRequired: 'exists',
    strTrim: 'here',
    strMin: 'to',
    strMax: 'also to',
    strTrim: 'test',
    strWhitespace: 'noWhitespace',
    strPattern: 'test@gmail.com'
  };
  const obj2 = { strType: 23, strRequired: 'exists', strTrim: 'test' };
  const obj3 = { strTrim: 'test' };
  const obj4 = { strMin: '1', strRequired: 'exists', strTrim: 'test' };
  const obj5 = { strMax: '1234456789823', strRequired: 'exists', strTrim: 'test' };
  const obj6 = { strTrim: '                         ', strRequired: 'exists' };
  const obj7 = { strWhitespace: 'my name is salah', strRequired: 'exists', strTrim: 'test' };
  const obj8 = { strPattern: 'test@test.com', strRequired: 'exists', strTrim: 'test' };

  expect(StrSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, strDefault: 'default name' }
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
  const StrSchemaCustomMessage = new Volder({
    strType: { type: [String, 'str not a string'] },
    strRequired: { type: String, required: [true, 'strRequired must exists'] },
    strTrim: { type: String, trim: true, required: [true, 'should be required'] },
    strMin: { type: String, minLength: [2, 'string min not valid'] },
    strMax: { type: String, maxLength: [10, 'string max not valid'] },
    strDefault: { type: String, default: 'default name' },
    strWhitespace: { type: String, whitespace: [false, 'whitespace is not allowed'] },
    strPattern: { type: String, pattern: [(input) => input.includes('gmail'), 'not valid pattern'] }
  });

  expect(StrSchemaCustomMessage.valid(obj1)).toBe(true);
  expect(StrSchemaCustomMessage.valid(obj2)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj3)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj4)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj5)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj6)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj7)).toBe(false);
  expect(StrSchemaCustomMessage.valid(obj8)).toBe(false);

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
});

test('Number type validation', () => {
  const NumSchema = new Volder({
    NumType: Number,
    NumRequired: { type: Number, required: true },
    NumMin: { type: Number, min: 3 },
    NumMax: { type: Number, max: 100 },
    NumDefault: { type: Number, default: 100 },
    NumPattern: { type: Number, pattern: (input) => input % 2 === 0 }
  });

  const obj1 = { NumType: 23, NumRequired: 100, NumMin: 33, NumMax: 100, NumPattern: 120 };
  const obj2 = { NumType: 'string', NumRequired: 100 };
  const obj3 = {};
  const obj4 = { NumMin: 1, NumRequired: 100 };
  const obj5 = { NumMax: 101, NumRequired: 100 };
  const obj6 = { NumPattern: 101, NumRequired: 100 };

  expect(NumSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, NumDefault: 100 }
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

  const NumSchemaErrorMessage = new Volder({
    NumType: { type: [Number, 'should be a number type'] },
    NumRequired: { type: Number, required: [true, 'must exists'] },
    NumMin: { type: Number, min: [3, 'the min is 3'] },
    NumMax: { type: Number, max: [100, 'the max is 100'] },
    NumDefault: { type: Number, default: 100 },
    NumPattern: { type: Number, pattern: [(input) => input % 2 === 0, 'not valid pattern'] }

  });

  expect(NumSchemaErrorMessage.valid(obj1)).toBe(true);
  expect(NumSchemaErrorMessage.valid(obj2)).toBe(false);
  expect(NumSchemaErrorMessage.valid(obj3)).toBe(false);
  expect(NumSchemaErrorMessage.valid(obj4)).toBe(false);
  expect(NumSchemaErrorMessage.valid(obj5)).toBe(false);
  expect(NumSchemaErrorMessage.valid(obj6)).toBe(false);

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
});

test('Array type validation', () => {
  const ArrSchema = new Volder({
    arrType: Array,
    arrRequired: { type: Array, required: true },
    arrMin: { type: Array, minLength: 3 },
    arrMax: { type: Array, maxLength: 5 },
    arrDefault: { type: Array, default: [1, 2, 3] }
    // arrPattern: { type: Array, pat}
  });

  const obj1 = { arrType: [1, 3], arrRequired: ['exists'], arrMax: [1, 2, 3, 4, 5], arrMin: [1, 2, 3] };
  const obj2 = { arrType: true, arrRequired: ['exists'] };
  const obj3 = {};
  const obj4 = { arrMax: [1, 2, 3, 4, 5, 6], arrRequired: ['exists'] };
  const obj5 = { arrMin: [1, 2], arrRequired: ['exists'] };

  expect(ArrSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, arrDefault: [1, 2, 3] }
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

  const ArrSchemaErrorMessage = new Volder({
    arrType: { type: [Array, 'just array type'] },
    arrRequired: { type: Array, required: [true, 'should be exists'] },
    arrMin: { type: Array, minLength: [3, 'the min length is 3'] },
    arrMax: { type: Array, maxLength: [5, 'the max length is 5'] },
    arrDefault: { type: Array, default: [1, 2, 3] }
  });

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
});

test('Object type validation', () => {
  const ObjSchema = new Volder({
    objType: Object,
    objRequired: { type: Object, required: true },
    objDefault: { type: Object, default: { name: 'default' } }
  });

  const obj1 = { objType: { name: 'max' }, objRequired: { here: true } };
  const obj2 = { objType: 'string', objRequired: { here: true } };
  const obj3 = {};

  expect(ObjSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, objDefault: { name: 'default' } }
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

  const ObjSchemaErrorMessage = new Volder({
    objType: { type: [Object, 'the valid is object'] },
    objRequired: { type: Object, required: [true, 'should be exists'] },
    objDefault: { type: Object, default: { name: 'default' } }
  });

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
    value: obj3
  });
});

test('boolean type validation', () => {
  const BoolSchema = new Volder({
    boolType: Boolean,
    boolRequired: { type: Boolean, required: true },
    boolDefault: { type: Boolean, default: false }
  });

  const obj1 = { boolType: false, boolRequired: true };
  const obj2 = { boolType: [1, 3, 3], boolRequired: true };
  const obj3 = {};

  expect(BoolSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, boolDefault: false }
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
    value: obj3
  });

  const BoolSchemaErrorMessage = new Volder({
    boolType: { type: [Boolean, 'must true or false'] },
    boolRequired: { type: Boolean, required: [true, 'boolean is empty'] },
    boolDefault: { type: Boolean, default: false }
  });

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
    value: obj3
  });
});

test('null type validation', () => {
  const NullSchema = new Volder({
    nullType: null,
    nullRequired: { type: null, required: true },
    nullAvoid: { type: null, avoid: [null, String, Boolean] },
    nullDefault: { type: null, default: null }
  });

  const obj1 = { nullType: 'str', nullRequired: 'is required', nullAvoid: 23 };
  const obj2 = {};
  const obj3 = { nullAvoid: true, nullRequired: false };

  expect(NullSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, nullDefault: null }
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

  const NullSchemaErrorMessage = new Volder({
    nullType: null,
    nullRequired: { type: null, required: [true, 'null required must exists'] },
    nullAvoid: { type: [null, 'null string boolean type not valid'], avoid: [null, String, Boolean] },
    nullDefault: { type: null, default: null }
  });

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
});

test('custom function type validation', () => {
  const includesGmail = (input) => input.includes('gmail');
  const CustomFunctionSchema = new Volder({
    funcType: includesGmail,
    funcRequired: { type: includesGmail, required: true },
    functionDefault: { type: includesGmail, default: 'test@gmail.com' }
  });

  const obj1 = { funcType: 'i am have gmail', funcRequired: 'i have gmail' };
  const obj2 = { funcType: 'not have', funcRequired: 'i have gmail' };
  const obj3 = {};

  expect(CustomFunctionSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: { ...obj1, functionDefault: 'test@gmail.com' }
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

  const CustomFunctionSchemaErrorMessage = new Volder({
    funcType: { type: [includesGmail, 'should include gmail'] },
    funcRequired: { type: includesGmail, required: [true, 'must exists'] },
    functionDefault: { type: includesGmail, default: 'test@gmail.com' }
  });

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
});
