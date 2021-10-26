import { assertType } from "../../utils/assert-type";

export const setupTrimConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('trim') && optionConfigs.type === String) {
    assertType(optionConfigs.trim, 'boolean', 'trim property');
  }
};
