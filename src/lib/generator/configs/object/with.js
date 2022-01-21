export const setupWithconfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('with')) {
    if (!Array.isArray(optionConfigs.with)) {
      throw new TypeError('with property should be an Array type');
    }
    
    optionConfigs.with.forEach((key) => {
      if (typeof key !== 'string') {
        throw new Error(`in with config must be all keys in String type`);
      }
    });
  }
};
