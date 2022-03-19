const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const {v4: uuidv4} = require("uuid");
// const db = require('../db/db.json')

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request recieved for notes`)

  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new UX/UI tip
notes.post('/', (req, res) => {
  console.log(`${req.method} request received to submit notes`);

  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuidv4()
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    
    // readFromFile('./db/db.json').then((data) => notesData = JSON.parse(data));
    
    res.json(response);
  } else {
    res.json('Error in posting note');
  }

})

module.exports = notes;