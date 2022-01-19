import { configSpliter } from '../../setuption/config-spliter';
import { assertType } from '../../../utils/assert-type';

export const setupStateConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('state')) {
    if (Array.isArray(optionConfigs.state)) {
      configSpliter('state', 'boolean', optionConfigs);
    } else {
      assertType(optionConfigs.state, 'boolean', 'state property');
    }
  }
};
