import Volder from '../src/volder';

describe('console log all config properties', () => {
  it("print props",() => {
    const volder = new Volder({welcome:"welcome",hello:"hello"});
    console.log(volder)
  })
})