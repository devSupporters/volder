import { configSpliter } from '../config-spliter';
import { assertType } from '../../utils/assert-type';

export const setupPatternConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('pattern')) {
    if (Array.isArray(optionConfigs)) {
      configSpliter('pattern', 'function', optionConfigs);
    } else {
      const type = typeof optionConfigs.pattern;
      if (type !== 'function') {
        throw new Error(`Expected function type but received ${type} in pattern property`);
      }
    }
  }
};
