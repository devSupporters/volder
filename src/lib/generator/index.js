import { setupOptionWithConfigs } from './setuption/setup-option';

export const objectToMap = (config) => {
  const generatedMap = new Map();

  for (const option in config) {
    const configuredOption = setupOptionWithConfigs(config[option]);
    generatedMap.set(option, configuredOption);
  }

  return generatedMap;
};
