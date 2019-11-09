const http = require('http')
const app = require('./app.js')

// Importamos dotenv
const dotenv = require('dotenv')

// Esta funcion busca automáticamente el archivo .env
dotenv.config()

const server = http.createServer(app)

// Utilizamos la variable de ambiente PORT
server.listen(process.env.PORT)