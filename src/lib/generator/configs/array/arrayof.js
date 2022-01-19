import { configSpliter } from '../../setuption/config-spliter';

export const setupArrayOfConfig = (optionConfigs) => {
  const types = [String, Number, Array, Object, Boolean, null, undefined];
  if (optionConfigs.hasOwnProperty('arrayOf')) {
    if (Array.isArray(optionConfigs.arrayOf)) {
      configSpliter('arrayOf', 'boolean', optionConfigs);
    } 

    if(!types.includes(optionConfigs.arrayOf)) {
        throw new Error(`Expected on of [String, Number, Object, Boolean, Array, null, undefined] but received type ${typeof type} which ${type}`)
    }
  }
};
