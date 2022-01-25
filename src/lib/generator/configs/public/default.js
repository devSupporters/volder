export const setupDefaultConfig = (optionConfigs, type) => {
  if (optionConfigs.hasOwnProperty('default')) {
    switch (type) {
      case String:
        if (!(typeof optionConfigs.default === 'string' || optionConfigs.default instanceof String)) {
          throw new TypeError('Expected a String type value in default to properly to { type: String }');
        }
        break;
      case Number:
        if (!(typeof optionConfigs.default === 'number' || optionConfigs.default instanceof Number)) {
          throw new TypeError('Expected a Number type value in default to properly to { type: Number }');
        }
        break;
      case Boolean:
        if (!(typeof optionConfigs.default === 'boolean' || optionConfigs.default instanceof Boolean)) {
          throw new TypeError('Expected a Boolean type value in default to properly to { type: Boolean }');
        }
        break;
      case Array:
        if (!Array.isArray(optionConfigs.default)) {
          throw new TypeError('Expected a Array type value in default to properly to { type: Array }');
        }
        break;
      case Object:
        if (!(typeof optionConfigs.default === 'object' && optionConfigs.default !== null)) {
          throw new TypeError('Expected a Object type value in default to properly to { type: Object }');
        }
    }
  }
};
