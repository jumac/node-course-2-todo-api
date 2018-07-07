//import { ObjectId } from './C:/Users/jqrubi/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bson';

const { ObjectID } = require('mongodb');

var { mongoose } = require('./../server/db/mongoose');
var { Todo } = require('./../server/models/todo');
var {User} = require('./../server/models/user');

//var id = '5b3ec16ce3019b222039bb2011';
var id = '5b3d991436c9062470b73f5a';

//if (!ObjectID.isValid(id)) {
//    console.log('ID not valid');
//}

//Todo.find({
//    _id: id
//}).then((todos) => {
//    console.log('Todos', todos);
//});

//Todo.findOne({
//    _id: id
//}).then((todo) => {
//    console.log('Todo', todo);
//    });

//Todo.findById(id).then((todo) => {
//    if (!todo) {
//        //return stops further execution
//        return console.log('Id not found');
//    }
//    console.log('Todo By Id', todo);
//}).catch((e) => console.log(e));

//User.findById(id).then((user) => {
//    if (!user) {
//        return console.log('Id not found');
//    }
//    console.log('User by Id', user);
//}).catch((e) => console.log(e));

User.findById(id).then((user) => {
    if (!user) {
        return console.log('Id not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
    console.log(e);
});