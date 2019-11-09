const { Router } = require('express')
const router = Router()

const db = require('../database')
const Mascota = require('../database/modelos/Mascota')

// Importamos el middleware de autorizacion
const autorizar = require('../middleware/autorizar')

router.get('/', autorizar, function (req, res, next) {
    db.mascotas
        .find({ idUsuario: res.locals.idUsuario }, function (error, mascotas) {
            if (error) {
                return next(error)
            }
            res.send(mascotas)
        })
})

router.post('/', autorizar, function (req, res, next) {
    const mascota = new Mascota(req.body.nombre, res.locals.idUsuario)

    db.mascotas
        .insert(mascota, function (error, mascotaInsertada) {
            if (error) {
                return next(error)
            }
            res.header('Location', `/mascotas/${mascotaInsertada._id}`)
                .status(200)
                .send(mascotaInsertada)
        })
})

module.exports = router;
