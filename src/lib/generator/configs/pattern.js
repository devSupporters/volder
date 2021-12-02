import { configSpliter } from '../config-spliter';

export const setupPatternConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('pattern')) {
    if (Array.isArray(optionConfigs.pattern)) {
      configSpliter('pattern', 'function', optionConfigs);
    } else {
      const type = typeof optionConfigs.pattern;
      if (type !== 'function') {
        throw new Error(`Expected function type but received ${type} in pattern property`);
      }
    }
  }
};
