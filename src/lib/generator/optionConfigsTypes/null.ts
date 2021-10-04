export const nullTypeCase = (optionConfigs: any, defaultConfiguredOption: any) => {
  if (optionConfigs.hasOwnProperty('avoid')) {
    const allowedTypes = [String, Object, Array, Number, Boolean];
    if (!Array.isArray(optionConfigs.avoid)) {
      throw new TypeError('avoid property should be an array');
    }

    optionConfigs.avoid.forEach((type: any) => {
      if (!allowedTypes.includes(type)) {
        throw new TypeError(
          `Expected this types (String | Object | Array | Number | Boolean) but received type ${typeof type} which ${type}`
        );
      }
    });
    if (optionConfigs.avoid.length >= 1) {
      defaultConfiguredOption.avoid = optionConfigs.avoid;
    }
  }
};
