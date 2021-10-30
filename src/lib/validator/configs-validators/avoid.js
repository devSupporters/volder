export const validateAvoid = (input, avoidConfig) => {

  const inputTypeInJS = input === null ? null : input === undefined ? undefined : input.constructor;

  if (avoidConfig.includes(inputTypeInJS))
    return {
      valid: false,
      type: inputTypeInJS
    };

  return { valid: true };
};
