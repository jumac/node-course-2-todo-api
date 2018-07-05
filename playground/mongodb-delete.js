//const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

//var obj = new ObjectID();
//console.log(obj);

////ES6 destructure
//var user = { name: 'Jumac', age: 25 };
//var { name } = user;
//console.log(name);



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unabl to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //deleteMany
    //db.collection('Todos').deleteMany({ text: 'Eat lunch' })
    //    .then((result) => {
    //        console.log(result);
    //    });

    //deleteOne
    //db.collection('Todos')
    //    .deleteOne({ text: 'Eat lunch' })
    //    .then((result) => {
    //        console.log(result);
    //    });

    //findOneAndDelete
    //db.collection('Todos')
    //    .findOneAndDelete({ completed: false })
    //    .then((result) => {
    //        console.log(result);
    //    });

    db.collection('Users')
        .findOneAndDelete({ _id: new ObjectID('5b320ca3eae7c12148ae571d') })
        .then((result) => {
            console.log(result);
        });
});