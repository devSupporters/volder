export const setupWithConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('with')) configChecker('with', optionConfigs);
};

export const setupWithoutConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('without')) configChecker('without', optionConfigs);
};

export const setupStrictConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('strict')) configChecker('strict', optionConfigs);
};

const configChecker = (config, optionConfigs) => {
  if (!Array.isArray(optionConfigs[config])) {
    throw new TypeError(`${config} property should be an Array type`);
  }

  optionConfigs[config].forEach((key) => {
    if (typeof key !== 'string') {
      throw new Error(`in ${config} config must be all keys in String type`);
    }
  });
};
