import { assertType } from '../../../utils/assert-type';

export const setupRoundConfig = (optionConfigs) => {
  if (optionConfigs.hasOwnProperty('round')) {
    assertType(optionConfigs.round, 'boolean', 'round property');
  }
};
