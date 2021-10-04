import { assertType } from '../../utils/assertType';
import {trim} from '../defaultValues';

export const stringTypeCase = (optionConfigs: any, defaultConfiguredOption: any) => {
  if (optionConfigs.hasOwnProperty('trim')) {
    assertType(optionConfigs.trim, 'boolean', 'trim property');
    defaultConfiguredOption.trim = optionConfigs.trim;
  } else {
    defaultConfiguredOption.trim = trim;
  }
};
