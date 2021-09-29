export const assertStringOrNumber = (input:(number | string | any), type: ('string' | 'number')) => {
  let ValidType;
  
  if(type ==='string') ValidType = typeof input === type && input instanceof String;
  else ValidType = typeof input === type && input instanceof Number;

  if(!ValidType) {
    let invalidType:string = typeof input;

    if (invalidType === null) invalidType = 'null'
    else if (invalidType === 'object') invalidType = input.constructor.name;

    throw new TypeError(`Expected a ${type} but received a ${invalidType}`);
  }
};
