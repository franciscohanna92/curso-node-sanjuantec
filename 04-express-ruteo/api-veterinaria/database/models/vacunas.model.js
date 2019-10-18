const uuid = require('uuid/v1')

class Vacuna {
    constructor(tipo, fechaRealizacion, idMascota) {
        this._id = uuid()
        this.tipo = tipo
        this.fechaRealizacion = fechaRealizacion
        this.idMascota = idMascota
    }
}

module.exports = Vacuna