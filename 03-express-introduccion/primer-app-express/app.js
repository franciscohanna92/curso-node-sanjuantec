// Importamos Express
const express = require('express')

// Instanciamos una app express
const app = express()

// Le decimos a nuestra app que use nuestros middleware
app.get('/index.html', function(request, response, next) {
    response.send('<h1>Hola mundo!</h1>')
})

app.get('/users', function(request, response, next) {
    response.send([
        { id: 1, nombre: 'pepito' },
        { id: 2, nombre: 'juanita' },
    ])
})

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000')
})