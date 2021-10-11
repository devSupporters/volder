// this file for testing by run:
// > npm run build
// > npm run dev
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
