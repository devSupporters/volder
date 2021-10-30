import { objectToMap } from './generator/index';
import { validator } from './validator/index';
import { assertObject } from './utils/assert-object';

export class Volder {
  constructor(config) {
    assertObject(config);

    this.volderMap = objectToMap(config);

    this.validate = (input) => {
      assertObject(input);
      return validator(this.volderMap, input);
    };

    this.valid = (input) => {
      assertObject(input);
      return validator(this.volderMap, input, false);
    };
  }
}

// export class SignleVolder() {}
