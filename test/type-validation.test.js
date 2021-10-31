import { Volder } from '../src/index';

test('String type validation', () => {
  const StrSchema = new Volder({
    strType: String,
    strRequired: { type: String, required: true },
    strTrim: { type: String, trim: true, min: 3, required: true },
    strMin: { type: String, min: 2 },
    strMax: { type: String, max: 10 }
  });

  const obj1 = { strType: 'test', strRequired: 'exists', strTrim: 'here', strMin: 'to', strMax: 'also to' };
  const obj2 = { strType: 23 };
  const obj3 = {};
  const obj4 = { strMin: '1' };
  const obj5 = { strMax: '1234456789823' };
  const obj6 = { strTrim: '                         ', strRequired: 'exists' };

  expect(StrSchema.validate(obj1)).toEqual({
    valid: true,
    errors: {},
    value: obj1
  });
  expect(StrSchema.validate(obj2)).toEqual({
    valid: false,
    errors: {
      strRequired: 'strRequired is required',
      strType: 'strType should be a string',
      strTrim: 'strTrim is required'
    },
    value: {}
  });
  expect(StrSchema.validate(obj3)).toEqual({
    valid: false,
    errors: {
      strRequired: 'strRequired is required',
      strTrim: 'strTrim is required'
    },
    value: {}
  });
  expect(StrSchema.validate(obj4)).toEqual({
    valid: false,
    errors: {
      strMin: 'strMin should be at least 2 characters',
      strRequired: 'strRequired is required',
      strTrim: 'strTrim is required'
    },
    value: {}
  });
  expect(StrSchema.validate(obj5)).toEqual({
    valid: false,
    errors: {
      strMax: 'strMax should be at most 10 characters',
      strRequired: 'strRequired is required',
      strTrim: 'strTrim is required'
    },
    value: {}
  });
  expect(StrSchema.validate(obj6)).toEqual({
    valid: false,
    errors: {
      // strRequired: 'strRequired is required',
      strTrim: 'strTrim is required'
    },
    value: {}
  });

  const StrSchemaCustomMessage = new Volder({
    strType: { type: [String, 'str not a string'] },
    strRequired: { type: String, required: [true, 'strRequired must exists'] },
    strTrim: { type: String, trim: true, required: [true, 'should be required']},
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
      strRequired: 'strRequired must exists',
      strType: 'str not a string',
      strTrim: 'should be required'
    },
    value: {}
  });
  expect(StrSchemaCustomMessage.validate(obj3)).toEqual({
    valid: false,
    errors: {
      strRequired: 'strRequired must exists',
      strTrim: 'should be required'
    },
    value: {}
  });
  expect(StrSchemaCustomMessage.validate(obj4)).toEqual({
    valid: false,
    errors: {
      strMin: 'string min not valid',
      strRequired: 'strRequired must exists',
      strTrim: 'should be required'
    },
    value: {}
  });
  expect(StrSchemaCustomMessage.validate(obj5)).toEqual({
    valid: false,
    errors: {
      strMax: 'string max not valid',
      strRequired: 'strRequired must exists',
      strTrim: 'should be required'
    },
    value: {}
  });

  delete obj6.strRequired;
  expect(StrSchemaCustomMessage.validate(obj6)).toEqual({
    valid: false,
    errors: {
      strRequired: 'strRequired must exists',

      strTrim: 'should be required'
    },
    value: {}
  });
});
