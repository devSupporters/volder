import { singleVolder } from '../src/lib/single-volder';

test('singleVolder work correctly', () => {
  const personName = singleVolder({ type: String, maxLength: [10, 'not valid'] });

  expect(personName.schema).toEqual({ type: String, maxLength: 10, maxLengthErrorMessage: 'not valid' });
  expect(personName.valid('max')).toBe(true);
  expect(personName.valid('max and me and we and they')).toBe(false);

  expect(personName.validate('me')).toEqual({ valid: true, errors: null, value: 'me' });
  expect(personName.validate('mels;dghja;sldgjals;dg')).toEqual({ valid: false, errors: 'not valid', value: 'mels;dghja;sldgjals;dg' });
});
