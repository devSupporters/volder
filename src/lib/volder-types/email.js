export const Email = (input) => {
  const regex = /^[\w.+~&]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/
  //I have removed the unnecessary escape from the [email body]
  return regex.test(String(input))
};
