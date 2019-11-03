const uuid = require('uuid/v1')

class Mascota {
    constructor(nombre, idUsuario) {
        this._id = uuid()
        this.nombre = nombre
        this.idUsuario = idUsuario
    }
}

module.exports = Mascota