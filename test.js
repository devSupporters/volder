// this file for testing by run:
// > npm run build
// > npm run dev
const Volder = require('./dist/index.js').default;
console.log(Volder);
const person = new Volder({
    name: {
        type:String,
        min:1,
        max:10
    },
    age:{
        type: Number,
    } 
})
const [vaild, errors] = person.validate({name:"salah",age:""})
console.log(valid, errors)