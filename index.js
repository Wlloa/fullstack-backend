const { json, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(morgan('tiny'))
app.use(cors())


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

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = phonebook.find(p => p.id === id)
    if (!person) {
        response.status(404).end()
    }
    else {
        response.json(person)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(p => p.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if(!body.name || !body.number) {
        return response.status(404).json({
            error: 'missing contact name or number'
        })
    }

    if (phonebook.find(p => p.name === body.name)) {
        return response.status(404).json({
            error: "name must be unique"
        })
    }

    const contact = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    phonebook = phonebook.concat(contact)
    response.json(contact)

})


const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
