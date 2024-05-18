
import express from 'express';
import sqlite3 from 'sqlite3';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, '..', 'db', 'todo.db');
const db = new sqlite3.Database(dbPath);
const router = express.Router();

let todos = [];
db.all('SELECT * FROM todos', (err, rows) => {
    if (err) {
        return res.status(500).json({ message: 'Failed to retrieve todos', error: err.message });
    };
    todos = rows;
});

router.get('/', (req, res) => {
    db.all('SELECT * FROM todos', (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to retrieve todos', error: err.message });
        };
        return res.status(200).json(rows);
    });
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(404).json({ error: err.message });
        }
        return res.status(201).json(row);
    });
})

router.post('/', (req, res) => {
    const { title, completed } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Please include a title' });
    }
    const newTodo = {
        title: title,
        completed: completed
    };
    db.run('INSERT INTO todos (title, completed) VALUES (?, ?)', [newTodo.title, newTodo.completed], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Failed to add todo', error: err.message });
        }
        db.all('SELECT * FROM todos', (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to retrieve todos', error: err.message });
            };
            return res.status(200).json(rows);
        });
    });
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    const newTodo = {
        title: title,
        completed: completed
    };
    db.run('UPDATE todos SET title = ?, completed = ? WHERE id = ?', [newTodo.title, newTodo.completed, id], (err) => {
        if (err) {
            return res.status(404).json({ error: err.message });
        };
        db.all('SELECT * FROM todos', (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to retrieve todos', error: err.message });
            };
            return res.status(200).json(rows);
        });
    });
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    db.run('DELETE FROM todos WHERE id = ?', [id], (err) => {
        if (err) {
            return res.status(404).json({ error: err.message });
        };
        db.all('SELECT * FROM todos', (err, rows) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to retrieve todos', error: err.message });
            };
            return res.status(200).json(rows);
        });
    });
})

export default router;