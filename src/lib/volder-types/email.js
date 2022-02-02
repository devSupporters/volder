export const Email = (input) => {
  const regex = /^[\w.+~&\-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/

  return regex.test(String(input))
};
