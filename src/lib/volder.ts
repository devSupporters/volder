import { objectToMap } from './generator/index';
import { validator } from './validator/index';
import { assertObject } from './utils/assertObject';

export class Volder {
  readonly volderMap: Map<string, object>;

  constructor(private config: object) {
    assertObject(config);

    this.config = config;
    this.volderMap = objectToMap(this.config);
  }

  validate(input: object) {
    assertObject(input);
    return validator(this.volderMap, input);
  }
}
