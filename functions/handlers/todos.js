const { db } = require('../util/admin');

exports.getAllTodos = (req, res) => {
    db.collection('todos')
        .get()
        .then((data) => {
            let todos = [];
            data.forEach((doc) => {
                todos.push({
                    todoId: doc.id,
                    body: doc.data().body,
                    isDone: doc.data().isDone,
                    userHandle: doc.data().userHandle,
                });
            });
            return res.json(todos);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err.code });
        });
}

exports.getAllTodoForOneUser = (req, res) => {
    const user = {
        userHandle: req.query.userHandle
    };

    db.collection('todos')
        .where('userHandle',"==", user.userHandle)
        .orderBy('createdAt')
        .get()
        .then((data) => {
            let todos = [];
            data.forEach((doc) => {
                todos.push({
                    todoId: doc.id,
                    body: doc.data().body,
                    isDone: doc.data().isDone,
                    userHandle: doc.data().userHandle,
                });
            });
            return res.json(todos);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err });
        });
}

exports.markTodo = (req, res) => {
    const document = db.doc(`/todos/${req.query.todoId}`);
    document
        .update({"isDone" : true})
        .then(() => {
            res.json({ message: 'Todo marked completed' });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
}

exports.updateTodo = (req, res) => {
    const document = db.doc(`/todos/${req.query.todoId}`);
    document
        .update({"body" : req.query.body})
        .then(() => {
            res.json({ message: 'Todo Updated' });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
}

exports.createTodo = (req, res) => {
    const newTodo = {
        body: req.query.body,
        userHandle: req.query.userHandle,
        isDone : false,
        createdAt: new Date() 
    }

    db.collection('todos')
        .add(newTodo)
        .then((doc) => {
            const recTodo = newTodo;
            recTodo.todoId = doc.id;
            res.json(recTodo);
        })
        .catch((err) => {
            res.status(500).json({ error: 'something went wrong' });
            console.error(err);
        });
}

exports.deleteTodo = (req, res) => {
    const document = db.doc(`/todos/${req.body.todoId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return res.status(404).json({ error: 'Todo not found' });
            }
            return document.delete();
        })
        .then(() => {
            res.json({ message: 'Todo deleted successfully' });
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: err.code });
        });
}
