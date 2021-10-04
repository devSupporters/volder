// none number value types stand for type not have number value like (object is not have length)
export const noneNumberValueTypesCase = (defaultConfiguredOption: any) => {
  // removeing min and max properties from default configuration object
  const { min, max, ...newDefaultConfigOption } = defaultConfiguredOption;
  return newDefaultConfigOption
};
