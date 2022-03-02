import { Email } from '../src/lib/volder-types/email';
import { UUID } from '../src/lib/volder-types/uuid';
import { CreditCard } from '../src/lib/volder-types/credit-card';
import { URL } from '../src/lib/volder-types/url';
import { IPAddress } from '../src/lib/volder-types/ip-address';
import { Json } from '../src/lib/volder-types/json';
import { Volder } from '../src/index';

test('json volder type work correctly', () => {
  // Thses assertions are based on JSON grammar
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON

  // valid jsons
  expect(Json(`{}`)).toBe(true);
  expect(Json(`[]`)).toBe(true);
  expect(Json(`0`)).toBe(true);
  expect(Json(`0.1`)).toBe(true);
  expect(Json(`-1`)).toBe(true);
  expect(Json(`"string"`)).toBe(true);
  expect(Json(`"'single quote' in string"`)).toBe(true);
  expect(Json(`true`)).toBe(true);
  expect(Json(`false`)).toBe(true);
  expect(Json(`null`)).toBe(true);
  expect(Json(`[1,2,3]`)).toBe(true);
  expect(Json(`[1,\n2,3]`)).toBe(true);
  expect(Json(`[1,\t2,3]`)).toBe(true);
  expect(Json(`[1,\r2,3]`)).toBe(true);
  expect(Json(`{"list":[1,2,3]}`)).toBe(true);
  expect(Json(`{"a":"A","b":"B"}`)).toBe(true);
  expect(Json(`{"a":"a",\n"b":"B"}`)).toBe(true);
  expect(Json(`{"a":"a",\t"b":"B"}`)).toBe(true);
  expect(Json(`{"a":"a",\r"b":"B"}`)).toBe(true);

  // invalid jsons
  expect(Json(`{'a':'A'}`)).toBe(false); // Single Quote
  expect(Json(`{"a":'A'}`)).toBe(false);
  expect(Json(`{'a':"A"}`)).toBe(false);
  expect(Json(`'string'`)).toBe(false);
  expect(Json(`{"a":"A","b":"B",}`)).toBe(false); // Trailing Comma
  expect(Json(`01`)).toBe(false); // Leading zero
  expect(Json(`00.1`)).toBe(false);
  expect(Json(`NaN`)).toBe(false);
  expect(Json(`Infinity`)).toBe(false);
  expect(Json(`undefined`)).toBe(false);
  expect(Json(`{"a":"Str\ning"}`)).toBe(false); // Whitespace in string
  expect(Json(`{"a":"Str\ting"}`)).toBe(false);
  expect(Json(`{"a":"Str\ring"}`)).toBe(false);
});

test('email volder type work correctly', () => {
  // valid emails
  expect(Email('foo@bar.com')).toBe(true);
  expect(Email('x@x.au')).toBe(true);
  expect(Email('foo@bar.com.au')).toBe(true);
  expect(Email('hans@mller.com')).toBe(true);
  expect(Email('some.name.midd.leNa.me.and.localityextension@googlemail.com')).toBe(true);
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
    'foo@bar.co.uk.',
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
    'test12@invalid.c o',
    'test13@invalid.co　m',
    'test123+invalid! sub_address@gmail.com',
    'wrong()[]",:;<>@@gmail.com',
    '"wrong()[]",:;<>@@gmail.com',
    'username@domain.com�',
    'username@domain.com©'
  ];

  expect(invalid.every((email) => !Email(email))).toBe(true);
});

test('UUID volder type validation work correctly', () => {
  const valid = [
    'A987FBC9-4BED-3078-CF07-9141BA07C9F3',
    'A987FBC9-4BED-4078-8F07-9141BA07C9F3',
    'A987FBC9-4BED-5078-AF07-9141BA07C9F3'
  ];
  expect(valid.every((uuid) => UUID(uuid))).toBe(true);

  const invalid = [
    '',
    'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
    'A987FBC9-4BED-3078-CF07-9141BA07C9F3xxx',
    'A987FBC94BED3078CF079141BA07C9F3',
    '934859',
    '987FBC9-4BED-3078-CF07A-9141BA07C9F3',
    'AAAAAAAA-1111-1111-AAAG-111111111111'
  ];

  expect(invalid.every((uuid) => !UUID(uuid))).toBe(true);

  expect(UUID('E034B584-7D89-11E9-9669-1AECF481A97B', 1)).toBe(true);
  expect(UUID('A987FBC9-4BED-4078-8F07-9141BA07C9F3', 1)).toBe(false);

  expect(UUID('A987FBC9-4BED-2078-CF07-9141BA07C9F3', 2)).toBe(true);
  expect(UUID('A987FBC9-4BED-4078-8F07-9141BA07C9F3', 2)).toBe(false);

  expect(UUID('A987FBC9-4BED-3078-CF07-9141BA07C9F3', 3)).toBe(true);
  expect(UUID('A987FBC9-4BED-4078-8F07-9141BA07C9F3', 3)).toBe(false);

  expect(UUID('713ae7e3-cb32-45f9-adcb-7c4fa86b90c1', 4)).toBe(true);
  expect(UUID('A987FBC9-4BED-5078-AF07-9141BA07C9F3', 4)).toBe(false);

  expect(UUID('987FBC97-4BED-5078-AF07-9141BA07C9F3', 5)).toBe(true);
  expect(UUID('9c858901-8a57-4791-81fe-4c455b099bc9', 5)).toBe(false);
});

test('CreditCard volder type validation work correctly', () => {
  const valid = [
    '375556917985515',
    '36050234196908',
    '4716461583322103',
    '4716-2210-5188-5662',
    '4929 7226 5379 7141',
    '5398228707871527',
    '6283875070985593',
    '6263892624162870',
    '6234917882863855',
    '6234698580215388',
    '6226050967750613',
    '6246281879460688',
    '2222155765072228',
    '2225855203075256',
    '2720428011723762',
    '2718760626256570',
    '6765780016990268',
    '4716989580001715211',
    '8171999927660000',
    '8171999900000000021'
  ];
  expect(valid.every((creditCardNum) => CreditCard(creditCardNum))).toBe(true);

  const invalid = [
    'foo',
    'foo',
    '5398228707871528',
    '2718760626256571',
    '2721465526338453',
    '2220175103860763',
    '375556917985515999999993',
    '899999996234917882863855',
    'prefix6234917882863855',
    '623491788middle2863855',
    '6234917882863855suffix',
    '4716989580001715213'
  ];
  expect(invalid.every((creditCardNum) => !CreditCard(creditCardNum))).toBe(true);
});

test('URL volder type validation work correctly', () => {
  const valid = [
    'foobar.com',
    'www.foobar.com',
    'foobar.com/',
    'valid.au',
    'http://www.foobar.com/',
    'HTTP://WWW.FOOBAR.COM/',
    'https://www.foobar.com/',
    'HTTPS://WWW.FOOBAR.COM/',
    'http://www.foobar.com:23/',
    'http://www.foobar.com:65535/',
    'http://www.foobar.com:5/',
    'https://www.foobar.com/',
    'ftp://www.foobar.com/',
    'http://www.foobar.com/~foobar',
    'http://user:pass@www.foobar.com/',
    'http://user:@www.foobar.com/',
    'http://:pass@www.foobar.com/',
    'http://example.com/example.json#/foo/bar',
    'http://1337.com'
  ];
  expect(valid.every((url) => URL(url))).toBe(true);
});

test('IPAddress volder type validation work correctly', () => {
  const valid = [
    '127.0.0.1',
    '0.0.0.0',
    '255.255.255.255',
    '1.2.3.4',
    '::1',
    '2001:db8:0000:1:1:1:1:1',
    '2001:db8:3:4::192.0.2.33',
    '2001:41d0:2:a141::1',
    '::ffff:127.0.0.1',
    '::0000',
    '0000::',
    '1::',
    '1111:1:1:1:1:1:1:1',
    'fe80::a6db:30ff:fe98:e946',
    '::',
    '::8',
    '::ffff:127.0.0.1',
    '::ffff:255.255.255.255',
    '::ffff:0:255.255.255.255',
    '::2:3:4:5:6:7:8',
    '::255.255.255.255',
    '0:0:0:0:0:ffff:127.0.0.1',
    '1:2:3:4:5:6:7::',
    '1:2:3:4:5:6::8',
    '1::7:8',
    '1:2:3:4:5::7:8',
    '1:2:3:4:5::8',
    '1::6:7:8',
    '1:2:3:4::6:7:8',
    '1:2:3:4::8',
    '1::5:6:7:8',
    '1:2:3::5:6:7:8',
    '1:2:3::8',
    '1::4:5:6:7:8',
    '1:2::4:5:6:7:8',
    '1:2::8',
    '1::3:4:5:6:7:8',
    '1::8',
    'fe80::7:8%eth0',
    'fe80::7:8%1',
    '64:ff9b::192.0.2.33',
    '0:0:0:0:0:0:10.0.0.1'
  ];

  expect(valid.every((ip) => IPAddress(ip))).toBe(true);

  const invalid = [
    'abc',
    '256.0.0.0',
    '0.0.0.256',
    '26.0.0.256',
    '0200.200.200.200',
    '200.0200.200.200',
    '200.200.0200.200',
    '200.200.200.0200',
    '::banana',
    'banana::',
    '::1banana',
    '::1::',
    '1:',
    ':1',
    ':1:1:1::2',
    '1:1:1:1:1:1:1:1:1:1:1:1:1:1:1:1',
    '::11111',
    '11111:1:1:1:1:1:1:1',
    '2001:db8:0000:1:1:1:1::1',
    '0:0:0:0:0:0:ffff:127.0.0.1',
    '0:0:0:0:ffff:127.0.0.1'
  ];

  expect(invalid.every((ip) => !IPAddress(ip))).toBe(true);
  expect(IPAddress('255.255.255.255', 10)).toBe(false);
});

test('work with volder correctly', () => {
  const schema = new Volder({
    func: UUID,
    str: { type: String, pattern: Email }
  });

  expect(schema.validate({ func: 'E034B584-7D89-11E9-9669-1AECF481A97B', str: 'test@test.com' })).toEqual({
    valid: true,
    errors: {},
    value: { func: 'E034B584-7D89-11E9-9669-1AECF481A97B', str: 'test@test.com' }
  });
  expect(schema.validate({ func: 'E034B584-7D89-11E9-9669-1AECF481A97', str: 'testtestcom' })).toEqual({
    valid: false,
    errors: { func: 'func is invalid', str: 'str is not in proper pattern' },
    value: {}
  });
});
