export const validateUnique = (input) => {
  const isAllUniqueItems = input.every((value, index, arr) => {
    return arr.indexOf(value) === index;
  });

  return isAllUniqueItems;
};
