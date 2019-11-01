const validator = require('validator')

function validarIdMascota(req, res, next) {
    const idMascota = req.params.idMascota;
    if (!validator.isUUID(idMascota)) {
        return next({
            mensaje: 'El id especificado no tiene un formato correcto',
            status: 400
        })
    }
    return next()
}

module.exports = {
    validarIdMascota
}