const { json, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))
app.use(cors())

require('dotenv').config()

const Contact = require('./models/contact')

morgan.token('body', function getBody (req){
    return JSON.stringify(req.body)
})

app.use(morgan(':body'))

let phonebook =  [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendick",
        number: "39-23-6423122"
    }

]

const generateId = () => {
    const maxId = phonebook.length > 0 
    ? Math.max(...phonebook.map(p => p.id)) : 0
    
    return maxId + 1
}

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${phonebook.length} people <p>${new Date()}<p/>`)
})

app.get('/api/persons', (request, response, next) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    Contact.findById(request.params.id).then(contact => {
        response.json(contact)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    Contact.findByIdAndDelete(request.params.id)
    .then( result => {
        response.status(204).end()
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name || !body.number) {
        return response.status(404).json({
            error: 'missing contact name or number'
        })
    }

    // if (phonebook.find(p => p.name === body.name)) {
    //     return response.status(404).json({
    //         error: "name must be unique"
    //     })
    // }

    const contact = new Contact({
        name: body.name,
        number: body.number
    })

    contact.save().then( createdContact => {
        response.json(createdContact)
    })

})


const errorHandling = (error, request, response, next ) => {
    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    }
    next(error)
}

app.use(errorHandling)

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
