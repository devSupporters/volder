import { configSpliter } from '../../setuption/config-spliter';
import { assertType } from '../../../utils/assert-type';

export const setupWhitespaceConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('whitespace')) {
    if (Array.isArray(optionConfigs.whitespace)) {
      configSpliter('whitespace', 'boolean', optionConfigs);
    } else {
        assertType(optionConfigs.whitespace, 'boolean', 'whitespace property');
    }
  }
};
