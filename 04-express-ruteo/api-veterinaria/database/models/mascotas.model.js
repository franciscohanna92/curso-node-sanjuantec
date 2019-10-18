const uuid = require('uuid/v1')

class Mascota {
    constructor(nombre, tipo, fechaNacimiento) {
        this._id = uuid()
        this.nombre = nombre
        this.tipo = tipo
        this.fechaNacimiento = fechaNacimiento
    }
}

module.exports = Mascota