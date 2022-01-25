import { assertType } from "../../../utils/assert-type";

export const setupSensibleConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('sensible')) {
    assertType(optionConfigs.sensible, 'boolean', 'sensible property');
  }
};
