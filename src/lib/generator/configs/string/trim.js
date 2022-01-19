import { assertType } from "../../../utils/assert-type";

export const setupTrimConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('trim')) {
    assertType(optionConfigs.trim, 'boolean', 'trim property');
  }
};
