const express = require('express')

// Importamos nuestros middleware
const bodyParser = require('body-parser')
const logger = require('./middleware/logger')

// Instanciamos una app express
const app = express()

// Le decimos a nuestra app que use nuestros middleware
app.use(logger)
app.use(bodyParser.json())

app.get('/saludar', function(request, response, next) {
    response.send('Hola mundo!')
})

app.post('/saludar', function(request, response, next) {
    let body = request.body;
    let nombre = body.nombre;

    response.send(`Hola ${nombre}!`)
})

// Implementamos un middleware final para las rutas no encontradas
app.use((request, response, next) => {
    response.status(400).send({
        message: 'Not found',
        error: 404
    })
})

module.exports = app