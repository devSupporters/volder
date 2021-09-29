// this file for testing by run:
// > npm run build
// > npm run dev
const Volder = require('./dist/index.js').default;

const person = new Volder({
    name: {
        type:String,
        min:1,
        max:12 
    },
    age:{
        type: Number,
        min:12,
        max:13
    } 
})
const result = person.validate({name:"welcome"})
console.log(result[0])
console.log(result[1]);
// console.log("welcome")