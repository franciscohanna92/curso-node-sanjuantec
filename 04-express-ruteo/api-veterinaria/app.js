// Importamos express
const express = require('express')

// Importamos los middleware necesarios
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Importamos los routers
const mascotasRouter = require('./routes/mascotas.js')

// Instanciamos una app de Express
const app = express()

// Utilizamos los middleware
app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.send({
        nombre: 'API Veterinaria',
        version: '1.0.0'
    })
})

// Le indicamos a nuestra app que use los routers
app.use('/mascotas', mascotasRouter)

app.use((req, res, next) => {
    res.statusCode = 400
    res
    .send({
        error: 'Recurso no encontrado',
    })
})

// Exportamos nuestra app
module.exports = app
