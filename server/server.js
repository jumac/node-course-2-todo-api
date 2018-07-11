require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var {Todo} = require('./models/todo');
var { User } = require('./models/user');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    //console.log(req.body.text);
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

app.delete('/todos/:id', (req, res) => {
    //get the id
    var id = req.params.id;
    console.log(id);
    //validate the id -> not valid? return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    //remove todo by id
    Todo.findByIdAndRemove(id).then((todo) => {
        //success
        if (todo) {
            //if doc send doc with 200
            res.send({ todo });
        }
        else {
            //if no doc, send 404
            res.status(404).send();
        }
    }).catch((e) => {
        //error
        //400 with empty body
        res.status(400).send();
    }); 
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;    
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send(); 
    }
     
    if (_.isBoolean(body.completed) && body.completed) {
        //boolean and true
        body.completedAt = new Date().getTime(); //gettime returns javascript timestamp
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }
     
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
}); 

//POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
        //res.send(doc);
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
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