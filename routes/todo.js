
import express from 'express';

const router = express.Router();

let todos = [
    {id: 1, title: 'Clean room', completed: true},
    {id: 2, title: 'Grocery Shopping', completed: false},
    {id: 3, title: 'Study', completed: true},
];

router.get('/', (req, res) => {
    if (!todos) {
        return res.status(404).json({message: 'Not Found'});
    }
    return res.status(200).json(todos);
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
        return res.status(404).json({message: `post with id ${id} is not found`});
    }
    return res.status(200).json(todo)
})

router.post('/', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        title: req.body.title,
        completed: req.body.completed
    };
    if (!newTodo.title) {
        return res.status(400).json({message: 'please include a title'});
    }
    todos.push(newTodo);
    return res.status(200).json(todos);
})

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
        return res.status(404).json({message: `post with id ${id} is not found`});
    }
    todo.title = req.body.title ? req.body.title : todo.title;
    todo.completed = req.body.completed;
    return res.status(200).json(todo);
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
        return res.status(404).json({message: `post with id ${id} is not found`});
    }
    todos = todos.filter((todo) => todo.id !== id);
    return res.status(200).json(todos);
})

export default router;