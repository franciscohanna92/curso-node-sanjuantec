class User {
    constructor(id, nombre) {
        this.id = id
        this.nombre = nombre
    }

    getId() {
        return this.id
    }
}

module.exports = User