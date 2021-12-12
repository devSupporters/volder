import { configSpliter } from '../config-spliter';

export const setupMatchesConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('matches')) {
    if (Array.isArray(optionConfigs.matches)) {
      configSpliter('matches', 'other', optionConfigs);
    }
    optionConfigs.matches = new RegExp(optionConfigs.matches);
  }
};
