// this file for testing by run:
// > npm run start # to run rollup --watch server - auto building - 
// > npm run dev   # to run node server

const Volder = require('./dist/index.cjs');

const volder1 = new Volder({
  name: {
    type: String
  },
  age: Number
});

const volder2 = new Volder({
  person: {
    type: [volder1, 'must an object']
  }
});
console.log(volder2.validate({ person: '' }));
