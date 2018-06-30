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

    //db.collection('Todos').insertOne({
    //    text: 'Something to do',
    //    completed: false
    //}, (err, result) => {
    //    if (err) {
    //        return console.log('Unable to insert todo', err);
    //    }

    //    console.log(JSON.stringify(result.ops, undefined, 2));
    //});

    db.collection('Users').insertOne({
        name: 'Justice Roy Rubi', 
        age: 38, 
        location: 'Cebu City'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert user', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.close(); 
});