// this file for testing by run:
// > npm run build
// > npm run dev
import Volder from 'volder';

const person = new Volder({
  name: {
    type: String,
    min: 4,
    required: true
  },
  age: {
    type: Number,
    max: 100
  }
});
