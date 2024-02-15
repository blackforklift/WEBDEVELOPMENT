const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

}

const fruitSchema = new mongoose.Schema({

    name: String,
    rating:{
        type: Number,
        min:1,
        max:10
    } ,
    review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit= new Fruit({
    name: "peach",
    rating: 10,
    review:"pretty yummy as a fruit"

});

async function myfruits() {
    const fruits= await Fruit.find({});
    fruits.forEach(function(fruit){
        console.log(fruit.name);
    });
}
myfruits();





// const personSchema = new mongoose.Schema({
//     name:String,
//     age: Number
// });

// const Person =mongoose.model("Person",personSchema);

// const person = new Person({
//     name: "john",
//     age:37
// });

// const banana = new Fruit({

//     name: "Banana",
//     rating: 5,
//     review: "nice fruit"
// });

// const kiwi = new Fruit({
//     name:"kiwi",
//     rating: 8,
//     review: "a bit sour but very delicious fruit"
// });

// Fruit.insertMany([banana,kiwi]);