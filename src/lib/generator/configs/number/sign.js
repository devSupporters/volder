import { configSpliter } from '../../setuption/config-spliter';
import { assertType } from '../../../utils/assert-type';

export const setupSignConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('sign')) {

    if (Array.isArray(optionConfigs.sign)) configSpliter('sign', 'string', optionConfigs)
    else assertType(optionConfigs.sign, 'string', 'sign property');
    
    if (!(['positive', 'negative'].includes(optionConfigs.sign))) {
      throw new Error('sign config must only equal to "positive" or "negative" value');
    }  
    
  }
};
