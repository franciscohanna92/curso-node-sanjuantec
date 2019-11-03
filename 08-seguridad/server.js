const http = require('http')
const app = require('./app.js')
const PORT = 3000

const server = http.createServer(app)

server.on('listening', function() {
    console.info(`Servidor escuchando en http://localhost:${PORT}`)
})

server.listen(PORT)