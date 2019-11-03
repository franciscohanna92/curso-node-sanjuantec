const validator = require('validator')

function validarId(req, res, next) {
    const id = req.params.id;
    if (!validator.isUUID(idMascota)) {
        return next({
            mensaje: 'El id especificado no tiene un formato correcto',
            status: 400
        })
    }
    return next()
}

module.exports = {
    validarId
}