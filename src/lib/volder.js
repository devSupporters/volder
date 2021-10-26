import { objectToMap } from './generator/index';
import { validator } from './validator/index';
import { assertObject } from './utils/assert-object';

export class Volder {
  constructor(config) {
    assertObject(config);
    this.volderMap = objectToMap(config);
  }

  validate(input) {
    assertObject(input);
    return validator(this.volderMap, input);
  }
}
