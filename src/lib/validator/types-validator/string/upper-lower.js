export const validateUppercase = (input) => {
  const len = input.length;
  for (let i = 0; i < len; i++) {
    let code = input.charCodeAt(i);
    if (code > 96 && code < 123) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
};

export const validateLowercase = (input) => {
  const len = input.length;
  for (let i = 0; i < len; i++) {
    let code = input.charCodeAt(i);
    if (code > 64 && code < 91) { // upper alpha (A-Z)
      return false;
    }
  }
  return true;
};
