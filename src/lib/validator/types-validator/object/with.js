export const validateWith = (input, withConfig) => {
  const inputKeys = Object.keys(input);
  const isAllIncluded = withConfig.every((key) => inputKeys.includes(key));
  return isAllIncluded;
};
