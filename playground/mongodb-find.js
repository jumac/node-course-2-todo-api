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

    //db.collection('Todos').find()
    //db.collection('Todos').find({ completed: false })
    //db.collection('Todos').find({ _id: ObjectID('5b31d7e4b626fa1e4ca414d4') })
    //    .toArray().then((docs) => {
    //        console.log('Todos');
    //        console.log(JSON.stringify(docs, undefined, 2));
    //    }, (err) => {
    //        console.log('Unable to fetch todos', err);
    //    });

    //db.collection('Todos').find()
    //    .count().then((count) => {
    //        console.log('Todos');
    //        console.log(count);
    //    }, (err) => {
    //        console.log('Unable to fetch todos', err);
    //    });

    db.collection('Users').find()
        .toArray().then((users) => {
            console.log('Users');
            console.log(JSON.stringify(users, undefined, 2));
        }, (err) => {
            console.log('Unable to fetch users', err);
        });

    db.collection('Users').find()
        .count().then((totalRecs) => {
            console.log('Total users: ', totalRecs);
        }, (err) => {
            console.log('Unable to fetch users', err);
        });

    //db.close(); 
});