const path = require('path');
const fs = require('fs');
const express = require('express');
const { endianness } = require('os');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// HTML

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// API Section - GET Route for notes

app.get('/api/notes', (req, res) => {
    res.json(JSON.parse(fs.readFileSync('./db/db.json') || []));
});

// POST route for notes

app.post('/api/notes', (req, res) => {
    let notes = JSON.parse(fs.readFileSync('./db/db.json') || []);
    let newNote = {
      id: notes.length == 0 ? 1 : Math.max(...notes.map(note => note.id)) + 1,
      ...req.body,
    };
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.json(notes);
});

// DELETE route for notes

app.delete('/api/notes/:id', (req, res) => {
    if (!req.params.id) res.end();
    let notes = JSON.parse(fs.readFileSync('./db/db.json') || []);
    let noteIndex = notes.findIndex(note => note.id === +req.params.id);
    let note = notes.splice(noteIndex, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    res.send(note);
});

// REDIRECT TO INDEX

app.get('/:wildcard', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

// peacful-everglades-63833 << Heroku