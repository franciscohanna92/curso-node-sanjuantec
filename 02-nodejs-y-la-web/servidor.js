const http = require('http')
const url = require('url')

const PORT = 3000
const usuariosBD = require('../01-introduccion/usuarios/users')

const server = http.createServer(listener)

function listener(req, res) {
    // aca escribimos response
    try {
        switch(req.url) {
            case '/users':
                res = devolverJsonDeUsuarios(res);
                break;
            case '/index.html':
                res = devolverPaginaWeb(res);
                break;
            default:
                res = devolver404(res)
                break;
        }
    } catch(error) {
        res = devolver500(res, error.message)
    }
    res.end()
}

function devolver500(res, mensajeDeError) {
    res.writeHead(500, 'INTERNAL SERVER ERROR', {
        'Content-Type': 'text/plain'
    })

    res.write(mensajeDeError)
    return res;
}

function devolver404(res) {
    res.writeHead(404, 'NOT FOUND', {
        'Content-Type': 'text/plain'
    })

    res.write('No se encontró el recurso')
    return res;
}

function devolverPaginaWeb(res) {
    res.writeHead(200, 'OK', {
        'Content-Type': 'text/html'
    })
    res.write('<h1>Hola mundo!</h1>')
    return res;
}

function devolverJsonDeUsuarios(res) {
    // Especificamos la respuesta en formato json
    res.writeHead(200, 'OK', {
        'Content-Type': 'application/json'
    })
    // obtenemos nuestros de base de datos
    let usuarios = usuariosBD.obtenerUsuarios();

    // convertimos nuestro listado de usuarios a un JSON string
    let usuariosString = JSON.stringify(usuarios)

    // escribimos el json string en el body del response
    res.write(usuariosString)
    return res;
}

server.on('listening', function () {
    console.log('El servidor esta escuchando en el puerto ' + PORT)
})

// pone a escuchar un servidor en http://localhost:3000
server.listen(PORT, 'localhost')