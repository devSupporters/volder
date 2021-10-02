import { max, min, required, trim } from '../src/lib/generator/defaultValues';

test('all values are set to default', () => {
  expect(max).toBeNull();
  expect(min).toBe(null);
  expect(required).toBe(false);
  expect(trim).toBe(false);
});
