const functions = require('firebase-functions');
const app = require('express')();

const cors = require('cors');
app.use(cors());

const {
    getAllTodoForOneUser,
    createTodo,
    deleteTodo,
    markTodo,
    updateTodo
} = require('./handlers/todos');
const {
    login
} = require('./handlers/users');

// TODO list related routes

app.get('/gettodo', getAllTodoForOneUser);
app.post('/todo', createTodo);
app.delete('/todo', deleteTodo);
app.post('/marktodo', markTodo);
app.post('/update', updateTodo);

// users routes
app.post('/login', login);

exports.api = functions.region('asia-southeast2').https.onRequest(app);