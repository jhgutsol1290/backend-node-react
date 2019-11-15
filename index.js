const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors')


//cargar DB
require('./db')

//crear el servidor
const app = express()

//bodyParser
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//utilizar cors - permite que un cliente se conecte a oro servidor para el intercambio de recursos
app.use(cors())

//Rutas de la app
app.use(routes)

//carpeta pública
app.use(express.static('uploads'))


//puerto
app.listen(5000, () => console.log('Server running on port 5000'))