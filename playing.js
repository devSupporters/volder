// this file for testing by run:
// > npm run start # to run rollup --watch server - auto building -
// > npm run dev   # to run node server

const { Volder } = require('./dist/index.cjs.js');

const person = new Volder({
  name: {
    type: String,
    min: 4,
    required: true
  },
  age: {
    type: Number,
    max: 100,
    required: true
  }
});
console.log(person.validate({}));
