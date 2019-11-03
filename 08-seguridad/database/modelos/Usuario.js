const uuid = require('uuid/v1')

class Usuario {
    constructor(email, password, rol) {
        this._id = uuid()
        this.email = email
        this.password = password
        this.rol = rol
    }
}

module.exports = Usuario