const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Routers
const usuariosRouter = require('./routes/usuarios')
const mascotasRouter = require('./routes/mascotas')

const app = express()

app.use(helmet())
app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.send({
        nombre: 'API Segura',
        version: '1.0.0'
    })
})
 
// Le indicamos a nuestra app que use los routers
app.use('/usuarios', usuariosRouter)
app.use('/mascotas', mascotasRouter)

app.use((req, res, next) => {
    next({
        mensaje: 'Recurso no encontrado',
        status: 404
    })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
        .send({
            error: err.message
        })
})

module.exports = app
