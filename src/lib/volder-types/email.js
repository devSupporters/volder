export const Email = (input) => {
  const regex = /^[\w.~!#$%&'*+-/=?^_`{|]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/;
  const code = String(input).charCodeAt(0);

  if (!(code > 64 && code < 91) && !(code > 96 && code < 123)) {
    return false;
  }
  return regex.test(String(input))
};
