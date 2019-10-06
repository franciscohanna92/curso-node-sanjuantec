const User = require('./User.js')
const {find} = require('lodash')

const usuarios = [
    new User(1, 'pepito'),
    new User(2,'juanita')
]

function obtenerUsuarios() {
    return usuarios
}

function obtenerUsuarioPorId(id) {
    return find(usuarios, (usuario) => {
        return usuario.getId() == id
    })
}

function agregarUsuario(id, nombre) {
    let nuevoUsuario = new User(id, nombre);
    usuarios.push(nuevoUsuario)
    return true;
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    agregarUsuario
}