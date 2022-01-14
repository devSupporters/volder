export const validateMatches = (input, matchesConfig) => {
  return matchesConfig.test(input);
};
