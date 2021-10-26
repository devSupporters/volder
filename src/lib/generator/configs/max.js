import { configSpliter } from "../config-spliter";
import { assertType } from "../../utils/assert-type";

export const setupMaxConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('max')) {
    if (Array.isArray(optionConfigs.max)) {
      configSpliter('max', 'number', optionConfigs);
    } else {
      assertType(optionConfigs.max, 'number', 'max property');
    }
  }
};
