var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var {Todo} = require('./models/todo');
var { User } = require('./models/user');

const { ObjectID } = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    console.log(req.body.text);
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
            //can add another property
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

//GET /todos/id
app.get('/todos/:id', (req, res) => {
    //res.send(req.params);
    var id = req.params.id;

    //Validate id using isvalid
        //return 404 - send back empty send
    if (!ObjectID.isValid(id)) {
        //return will stop the execution
        return res.status(404).send();
    }

    //findById
    Todo.findById(id).then((todo) => {
        //success
        //if no todo - send back 404 with empty body            
        if (!todo) {
            res.status(404).send();            
        }
        //if todo - send it back
        res.send({ todo });
    }).catch((e) => {
        //error
        //return 400 - send back empty body
        res.status(400).send();
    }); 
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = { app };

//var newUser = new User({
//    email: 'justiceroy.rubi@gmail.com'
//});

//newUser.save().then((doc) => {
//    console.log('User saved.')
//}, (e) => {
//    console.log('Unable to save user', e);
//});

//var newTodo = new Todo({
//    text: 'Cook dinner'
//});

//newTodo.save().then((doc) => {
//    console.log('saved todo', doc);
//}, (e) => {
//    console.log('Unable to save todo');
//});

//var todoJumac = new Todo({
//    text: 'This is a test',
//    completed: false,
//    completedAt: 5
//});

//todoJumac.save().then((doc) => {
//    console.log('Saved todo', doc);
//}, (e) => {
//    console.log('Unable to save todo', e);
//});