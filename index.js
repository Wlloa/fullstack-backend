const { json } = require('express')
const express = require('express')

const app = express()
app.use(express.json())

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

const PORT = 3001

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
    if(!body.name) {
        return response.status(404).json({
            error: 'missing contact name'
        })
    }

    const contact = {
        id: generateId(),
        name: body.name,
        number: body.number || ''
    }

    phonebook = phonebook.concat(contact)
    response.json(contact)

})


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
