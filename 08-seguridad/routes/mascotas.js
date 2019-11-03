const { Router } = require('express')
const router = Router()

const db = require('../database')
const Mascota = require('../database/modelos/Mascota')

router.get('/', function (req, res, next) {
    db.mascotas
        .find({}, function (error, mascotas) {
            if (error) {
                return next(error)
            }
            res.send(mascotas)
        })
})

router.post('/', function (req, res, next) {
    const mascota = new Mascota(req.body.nombre)

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
