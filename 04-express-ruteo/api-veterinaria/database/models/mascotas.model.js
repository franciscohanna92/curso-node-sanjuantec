const uuid = require('uuid/v1')

class Mascota {
    constructor(nombre, tipo, esDeRaza, raza, fechaNacimiento) {
        this._id = uuid()
        this.nombre = nombre
        this.tipo = tipo
        this.esDeRaza = esDeRaza
        this.raza = raza
        this.fechaNacimiento = fechaNacimiento
    }
}

module.exports = Mascota