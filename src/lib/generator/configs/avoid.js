export const setupAvoidConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('avoid') && optionConfigs.type === null) {
    const allowedTypes = [String, Object, Array, Number, Boolean];
    if (!Array.isArray(optionConfigs.avoid)) {
      throw new TypeError('avoid property should be an array');
    }

    optionConfigs.avoid.forEach((type) => {
      if (!allowedTypes.includes(type)) {
        throw new TypeError(
          `Expected this types (String | Object | Array | Number | Boolean) but received type ${typeof type} which ${type}`
        );
      }
    });
  }
};
