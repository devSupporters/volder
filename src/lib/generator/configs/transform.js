export const setupTransformConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('transform')) {
    const type = typeof optionConfigs.pattern;
    if (type !== 'function') {
      throw new Error(`Expected function type but received ${type} in transform property`);
    }
  }
};
