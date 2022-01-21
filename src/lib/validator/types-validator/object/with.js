export const validateWith = (input, withConfig) => {
  const isAllIncluded = input.every((key) => withConfig.includes(key));
  return isAllIncluded;
};
