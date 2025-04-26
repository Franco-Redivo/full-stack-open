const express = require('express');
require('dotenv').config();
const app = express();
const Contact = require('./models/person.js');
const morgan = require('morgan');

app.use(express.static('dist'));
app.use(express.json());
app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms :post')
);
morgan.token('post', (req) => {
    return req.method === 'POST' ? JSON.stringify(req.body) : ' '
});

const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    if(error.name === 'CastError'){
        return res.status(400).send({error: 'malformatted id'});
    }

    next(error);
}


app.get('/api/persons',(req, res) => {
    Contact.find({}).then(contacts => {
        res.json(contacts)
    })
});

app.get('/info', (req, res) => {
    const date = new Date();
    Contact.find({}).then((contacts)=> {
        res.send(`<p>Phonebook has info for ${contacts.length} people</p><p>${date}</p>`);
    });
    
});

app.get('/api/persons/:id', (req, res, next) => {
    Contact.findById(req.params.id).then(contact => {
        if(contact){
            res.json(contact);
        }else{
            res.status(404).end();
        }
    }).catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
    Contact.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end();
    }).catch(error => next(error));
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if(!body.name || !body.number){
        res.status(400).json({error: "Name or number missing"});
    }
   
    const contact = new Contact({
        name: body.name,
        number: body.number,

    });
   
    contact.save().then(savedContact => {
        res.json(savedContact);
    });
    
});

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;
    
    Contact.findById(req.params.id)
        .then(contact => {
            if (!contact){
                return res.status(404).end();
            }
            // contact.name = body.name;
            contact.number = body.number;

            return contact.save().then((updatedContact) => {
                res.json(updatedContact);
            });
        }).catch(error => next(error));
});


app.use(errorHandler);

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});