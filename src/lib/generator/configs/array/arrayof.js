import { configSpliter } from '../../setuption/config-spliter';

export const setupArrayOfConfig = (optionConfigs) => {
  const types = [String, Number, Array, Object, Boolean, null, undefined];
  if (optionConfigs.hasOwnProperty('arrayOf')) {
    if (Array.isArray(optionConfigs.arrayOf)) {
      configSpliter('arrayOf', 'other', optionConfigs);
    }

    if (!types.includes(optionConfigs.arrayOf)) {
      const value = Object.keys({ [optionConfigs.arrayOf]: '' })[0];
      throw new Error(`Expected one of [String, Number, Object, Boolean, Array, null, undefined] but received ${value}`);
    }
  }
};
