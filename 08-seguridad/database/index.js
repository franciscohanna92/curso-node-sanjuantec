var Datastore = require('nedb')

const usuarios = new Datastore({ filename: './database/datastores/usuarios.db', autoload: true })
const mascotas = new Datastore({ filename: './database/datastores/mascotas.db', autoload: true })

module.exports = {
    usuarios,
    mascotas
}