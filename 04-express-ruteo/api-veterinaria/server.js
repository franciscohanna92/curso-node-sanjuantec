const http = require('http')
const app = require('./app.js')

// Creamos un nuevo servidor con nuestra app
const server = http.createServer(app)

server.on('listening', function() {
    console.info(`Servidor escuchando en http://localhost:3000`)
})

// Ponemos a escuchar nuestro servidor en el puerto 3000
server.listen(3000)