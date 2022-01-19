export const validateArrayOf = (input, arrOfConfig) => {
  const isAllValidType = input.every((value) => {
    const valueType = value === null ? null : value === undefined ? undefined : value.constructor;
    return valueType == arrOfConfig;
  });

  return isAllValidType;
};
