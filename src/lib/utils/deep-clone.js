export function deepClone(item) {
  if (!item) {
    return item;
  }

  let types = [Number, String, Boolean];
  let result;

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach((type) => {
    if (item instanceof type) {
      result = type(item);
    }
  });

  if (typeof result == 'undefined') {
    if (Object.prototype.toString.call(item) === '[object Array]') {
      result = [];
      item.forEach((child, index) => {
        result[index] = deepClone(child);
      });
    } else if (typeof item == 'object') {
      // check that this is a literal
      if (item instanceof Date) {
        result = new Date(item);
      } else {
        // it is an object literal
        result = {};
        for (let i in item) {
          result[i] = deepClone(item[i]);
        }
      }
    } else {
      result = item;
    }
  }

  return result;
}
