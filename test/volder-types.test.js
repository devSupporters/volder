import { Email } from '../src/lib/volder-types/email';

test('email work correctly', () => {
  // valid emails
  expect(Email('foo@bar.com')).toBe(true);
  expect(Email('x@x.au')).toBe(true);
  expect(Email('foo@bar.com.au')).toBe(true);
  expect(Email('foo+bar@bar.com')).toBe(true);
  expect(Email('hans.m端ller@test.com')).toBe(true);
  expect(Email('hans@mller.com')).toBe(true);
  expect(Email('test|123@mller.com')).toBe(true);
  expect(Email('test123+ext@gmail.com')).toBe(true);
  expect(Email('some.name.midd.leNa.me.and.locality+extension@GoogleMail.com')).toBe(true);
  expect(Email('foobar@example.com')).toBe(true);
  expect(Email(`adfasdfasfa@aaaaaaaaaaaaaaaaaaaaaaaaaaaaa.com`)).toBe(true);
  expect(Email(`aaaaaaaaaaa@gmail.com`)).toBe(true);
  expect(Email('test@1337.com')).toBe(true);
  expect(Email('test.1@gmail.com')).toBe(true);

  // invalid emails
  const invalid = [
    'invalidemail@',
    'invalid.com',
    '@invalid.com',
    'foo@bar.com.',
    'somename@ｇｍａｉｌ.com',
    'foo@bar.co.uk.',
    'z@co.c',
    'test1@invalid.co m',
    'test2@invalid.co m',
    'test3@invalid.co m',
    'test4@invalid.co m',
    'test5@invalid.co m',
    'test6@invalid.co m',
    'test7@invalid.co m',
    'test8@invalid.co m',
    'test9@invalid.co m',
    'test10@invalid.co m',
    'test11@invalid.co m',
    'test12@invalid.co　m',
    'test13@invalid.co　m',
    'multiple..dots@stillinvalid.com',
    'test123+invalid! sub_address@gmail.com',
    'gmail...ignores...dots...@gmail.com',
    'ends.with.dot.@gmail.com',
    'multiple..dots@gmail.com',
    'wrong()[]",:;<>@@gmail.com',
    '"wrong()[]",:;<>@@gmail.com',
    'username@domain.com�',
    'username@domain.com©'
  ];
 
  expect(invalid.every((email) => !Email(email))).toBe(true);
});
