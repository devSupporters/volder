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
        min:-50,
        max:13,
        required:true

    },
    male :{
        type:String,
        min:1,
        max:2,
        required:true
    },
    anything:{
        type:[null, 'not there'],
        avoid:[String]
    }
})
const result = person.validate({name:"welcome",age:-23,male:"", anything:[]})
console.log(person.volderMap)
console.log(result[0])
console.log(result[1]);
