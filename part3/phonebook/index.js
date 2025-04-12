const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
app.use(cors());
app.use(express.json());
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :post')
);
morgan.token('post', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ' '
});

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons',(req, res) => {
    res.json(persons);
});

app.get('/info', (req, res) => {
    const date = new Date();
    const info = `Phonebook has info for ${persons.length} people <br> ${date}`;
    res.send(info);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);
    if(person){
        res.json(person);
    }else{
        res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const newPerson = req.body;

    if(!newPerson.name || !newPerson.number){
        res.status(400).json({error: "Name or number missing"});
    }
    if(nameExists(newPerson.name)){
        res.status(409).json({error: "Name must be unique"});
    }
    newPerson.id = (Math.floor(Math.random() * 200)).toString();
    persons = persons.concat(newPerson);
    res.json(newPerson);
});

const nameExists = (name) => {
    const array = persons.filter(person => person.name === name);

    if(array.length > 0){
        return true;
    }else if(array.length === 0){
        return false;
    }
}


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});