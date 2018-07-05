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

    //db.collection('Todos').findOneAndUpdate({
    //    _id: new ObjectID('5b3d70aa943e794de6ca5996')
    //}, {
    //    $set: {
    //        completed: true
    //    }
    //}, {
    //    returnOriginal: false
    //}).then((result) => {
    //    console.log(result);
    //});

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b31dd170febe6294845cfe9')
    }, {
            $set: {
                name: 'Cole Justroy D. Rubi'
            },
            $inc: {
                age: 1
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result);
        });
});