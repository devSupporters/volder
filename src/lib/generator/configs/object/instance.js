import { configSpliter } from '../../setuption/config-spliter';

export const setupInstanceConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('instance')) {
    if (Array.isArray(optionConfigs.instance)) configSpliter('instance', 'other', optionConfigs);

    const isConstructor = typeof optionConfigs.instance === 'function' && 'prototype' in optionConfigs.instance;
    if(!isConstructor) {
        throw new Error(`Expected a Constructor function but received ${typeof optionConfigs.instance} at instance property`)
    }
  }
};
