import { Volder } from '../volder';

export const isValidType = (input) => {
  const allValidtypes = [String, Number, Object, Array, Boolean, Date, null];

  if (!allValidtypes.includes(input) && !(input instanceof Volder) && typeof input !== 'function') {
    throw new TypeError(
      `Expected a type ( String | Number | Object | Array | Boolean | null | function type | Volder instance) but received a ${typeof input}`
    );
  }
  return true;
};
