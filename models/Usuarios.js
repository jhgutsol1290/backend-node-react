const { model, Schema } = require('mongoose')

const usuariosSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        required: 'Agrega tu nombre'
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model('Usuarios', usuariosSchema)