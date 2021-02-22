const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide full argument like node mongo.js my-pass Ana 000-000-000 ')
    process.exit()
}

const url = `mongodb+srv://fullstack:${process.argv[2]}@cluster0.covgz.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true})

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Contact', contactSchema)

const saveContact = (name, number) => {
    const contact = new Contact({
        name,
        number
    })

    contact.save().then(result => {
        console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}

const getAll = () => {
    Contact.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
    })
}

if( process.argv.length === 5) {
    saveContact(process.argv[3], process.argv[4])
}
else if (process.argv.length === 3) {
    getAll()
}


