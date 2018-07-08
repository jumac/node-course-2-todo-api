//import { ObjectId } from './C:/Users/jqrubi/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/bson';

const { ObjectID } = require('mongodb');

var { mongoose } = require('./../server/db/mongoose');
var { Todo } = require('./../server/models/todo');
var {User} = require('./../server/models/user');

//Remove everything will only return number of rows removed
//Todo.remove({}).then((result) => {
//    console.log(result);
//});

//Remove the document and returns the removed document
//Todo.findOneAndRemove()
//Todo.findByIdAndRemove()

Todo.findOneAndRemove({ _id: '5b41c651afec0863b5d5809e' }).then((todo) => {

});

Todo.findByIdAndRemove('5b41c651afec0863b5d5809e').then((todo) => {
    console.log(todo);
});