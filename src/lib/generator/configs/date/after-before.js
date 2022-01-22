import { configSpliter } from '../../setuption/config-spliter';
import { assertType } from '../../../utils/assert-type';
import { isValidDate } from '../../../utils/is-valid-date';

export const setupAfterConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('after')) {
    if (Array.isArray(optionConfigs.after)) configSpliter('after', 'string', optionConfigs);
    else assertType(optionConfigs.after, 'string', 'after property');

    if (!isValidDate(optionConfigs.after)) {
      throw new Error("the Date is not valid, should be 'mm/dd/yy' fomat and 1000 <= year <= 3000 in after property");
    }
  }
};

export const setupBeforeConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('before')) {
    if (Array.isArray(optionConfigs.before)) configSpliter('before', 'string', optionConfigs);
    else assertType(optionConfigs.before, 'string', 'before property');

    if (!isValidDate(optionConfigs.before)) {
      throw new Error("the Date is not valid, should be 'mm/dd/yy' fomat and 1000 <= year <= 3000 in before property");
    }
  }
};
