const path = require('path');
const fs = require('fs');
const express = require('express');
const { endianness } = require('os');

const PORT = process.env.PORT || 3001;
const app = express();

// INDEX.HTML

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

// API SECTION

app.get('/api/notes', (req, res) => {
    res.json(JSON.parse(fs.readFileSync('./db/db.json') || []));
});


app.get('/:wildcard', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

// peacful-everglades-63833 << Heroku