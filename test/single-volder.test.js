import { singleVolder } from '../src/lib/single-volder';

test('singleVolder work correctly', () => {
  const personName = singleVolder({ type: String, maxLength: 10 });

  expect(personName.schema).toEqual({ type: String, maxLength: 10 });
  expect(personName.valid('max')).toBe(true);
  expect(personName.valid('max and me and we and they')).toBe(false);

  expect(personName.validate('me')).toEqual({ valid: true, errors: {}, value: 'me' });
});
