export const validateMin = (input, minConfig) => {
  if (input < minConfig) return false;
  else return true;
};
