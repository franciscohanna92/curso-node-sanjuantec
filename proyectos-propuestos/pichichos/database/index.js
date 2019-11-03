var Datastore = require('nedb')

mascotas = new Datastore({ filename: './database/datastores/mascotas.db', autoload: true })
vacunas = new Datastore({ filename: './database/datastores/vacunas.db', autoload: true })

module.exports = {
    mascotas,
    vacunas
}