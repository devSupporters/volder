export const validateWith = (input, withConfig) => {
  const inputKeys = Object.keys(input);
  const isAllIncluded = withConfig.every((key) => inputKeys.includes(key));
  return isAllIncluded;
};

export const validateWithout = (input, withoutConfig) => {
  const inputKeys = Object.keys(input);
  const isNotAllIncluded = withoutConfig.every((key) => !inputKeys.includes(key));
  return isNotAllIncluded;
}