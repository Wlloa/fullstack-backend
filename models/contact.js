const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:false})
.then(result => {
    console.log("connected to MongoDb Atlas")
})
.catch(error => {
    console.log('error coneecting: ', error.message)
})

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        unique: true
    },
    number: {
        type: String,
        minlength: 8
    },
})

contactSchema.plugin(uniqueValidator)

contactSchema.set('toJSON',{
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)