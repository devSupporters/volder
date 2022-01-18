import { configSpliter } from '../../setuption/config-spliter';

export const setupSignConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('sign')) {
    if (!['positive', 'negative'].includes(optionConfigs.sign)) {
      throw new Error('sign config must only equal to "positive" or "negative" value');
    } else if (Array.isArray(optionConfigs.sign)) configSpliter('sign', 'string', optionConfigs);
  }
};
