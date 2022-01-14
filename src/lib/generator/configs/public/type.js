import {isValidType} from '../../../utils/is-valid-type';
import { configSpliter } from '../../config-spliter';

export const setupTypeConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('type')) {
    Array.isArray(optionConfigs.type) && configSpliter('type', 'constructor-type', optionConfigs);
    isValidType(optionConfigs.type);
  } else {
    throw new Error('type property is required');
  }
};
