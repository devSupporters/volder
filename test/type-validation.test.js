import { Volder } from '../src/index';

test('String type validation', () => {
  const StrSchema = new Volder({
    strType: String,
    strRequired: { type: String, required: true },
    strTrim: { type: String, trim: true, min: 3, required: true },
    strMin: { type: String, min: 2 },
    strMax: { type: String, max: 10 }
  });

  const obj1 = { strType: 'test', strRequired: 'exists', strTrim: 'here', strMin: 'to', strMax: 'also to', strTrim: 'test' };
  const obj2 = { strType: 23, strRequired: 'exists', strTrim: 'test' };
  const obj3 = { strTrim: 'test' };
  const obj4 = { strMin: '1', strRequired: 'exists', strTrim: 'test' };
  const obj5 = { strMax: '1234456789823', strRequired: 'exists', strTrim: 'test' };
  const obj6 = { strTrim: '                         ', strRequired: 'exists' };

  expect(StrSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: obj1
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
      strMin: 'strMin should be at least 2 characters'
    },
    value: {}
  });
  expect(StrSchema.validate(obj5)).toEqual({
    valid: false,
    errors: {
      strMax: 'strMax should be at most 10 characters'
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

  const StrSchemaCustomMessage = new Volder({
    strType: { type: [String, 'str not a string'] },
    strRequired: { type: String, required: [true, 'strRequired must exists'] },
    strTrim: { type: String, trim: true, required: [true, 'should be required'] },
    strMin: { type: String, min: [2, 'string min not valid'] },
    strMax: { type: String, max: [10, 'string max not valid'] }
  });

  expect(StrSchemaCustomMessage.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: obj1
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
});

test('Number type validation', () => {
  const NumSchema = new Volder({
    NumType: Number,
    NumRequired: { type: Number, required: true },
    NumMin: { type: Number, min: 3 },
    NumMax: { type: Number, max: 100 }
  });

  const obj1 = { NumType: 23, NumRequired: 100, NumMin: 33, NumMax: 100 };
  const obj2 = { NumType: 'string', NumRequired: 100 };
  const obj3 = {};
  const obj4 = { NumMin: 1, NumRequired: 100 };
  const obj5 = { NumMax: 101, NumRequired: 100 };

  expect(NumSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: obj1
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

  const NumSchemaErrorMessage = new Volder({
    NumType: { type: [Number, 'should be a number type'] },
    NumRequired: { type: Number, required: [true, 'must exists'] },
    NumMin: { type: Number, min: [3, 'the min is 3'] },
    NumMax: { type: Number, max: [100, 'the max is 100'] }
  });

  expect(NumSchemaErrorMessage.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: obj1
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
});

test('Object type validation', () => {});
