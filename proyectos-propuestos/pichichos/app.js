const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Documentación
const swaggerUi = require('swagger-ui-express')
const apiDocs = require('./docs')

// Routers
const exampleRouter = require('./routes/example.js')

const app = express()

// Middleware para loggeo y parseo de body
app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.send({
        nombre: 'Pichichos API',
        version: '1.0.0',
        links:  [
            {rel: 'example', href: '/example'},
        ]
    })
})
 
// Montamos la documentacion en la ruta /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDocs));

// Le indicamos a nuestra app que use los routers
app.use('/example', exampleRouter)

// Establecemos el middleware para manejo de error 404
app.use((req, res, next) => {
    res.status(404)
        .send({
            error: 'Recurso no encontrado',
        })
})

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    res.status(err.status || 500)
        .send(err)
})

module.exports = app
