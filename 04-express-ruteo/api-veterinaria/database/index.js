var Datastore = require('nedb')

mascotas = new Datastore({ filename: './datastores/mascotas.db', autoload: true })
vacunas = new Datastore({ filename: './datastores/vacunas.db', autoload: true })

module.exports = {
    mascotas,
    vacunas
}