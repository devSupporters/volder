import { configSpliter } from "../config-spliter";
import { assertType } from "../../utils/assert-type";

export const setupMinConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('min')) {
    if (Array.isArray(optionConfigs.min)) {
      configSpliter('min', 'number', optionConfigs);
    } else {
      assertType(optionConfigs.min, 'number', 'min property');
    }
  }
}