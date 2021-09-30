import { objectToMap } from '../src/lib/generator/index';
// import { setUpOptionWithConfigs } from '../src/lib/generator/setUpOption';

test('objectToMap should work correctly', () => {
  // Entering a correct values
  const obj1 = {
    name: { type: String, min: 3 },
    age: { type: Number, max: 100, required: true },
  };
  const obj2 = {position:{require:true}};
  const generatedMap = objectToMap(obj1);
  expect(generatedMap.has('name')).toBe(true);
  expect(generatedMap.has('age')).toBe(true);

  expect(generatedMap.get('name')).toEqual({ type: String, max: null, min: 3, required: false });
  expect(generatedMap.get('age')).toEqual({ type: Number, max: 100, min: null, required: true });

  // Entering a wrong values
  expect(()=> {objectToMap(obj2)}).toThrowError(new TypeError('type is required at position property'))
});
