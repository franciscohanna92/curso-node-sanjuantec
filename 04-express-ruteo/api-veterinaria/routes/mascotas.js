// Importamos el submódulo Router
const { Router } = require('express')

// Importamos modulo para validacion de IDs
const validator = require('validator')

// Importamos la base de datos y los modelos
const db = require('../database')
const Mascota = require('../database/models/mascotas.model')

// Instanciamos un router
const router = Router()

// Definir el resto de las rutas de mascotas aquí
router.get('/', function (req, res, next) {
    db.mascotas
        .find({}, function (error, mascotas) {
            if (error) {
                next(error)
            }
            res.send(mascotas)
        })
})

router.get('/:idMascota', function (req, res, next) {
    const idMascota = req.params.idMascota;

    // Validamos el ID de la mascota buscada
    if (!validator.isUUID(idMascota)) {
        let error = new Error('El id especificado no tiene un formato correcto')
        next(error)
    }

    db.mascotas
        .findOne({ _id: idMascota }, function (error, mascota) {
            if (error) {
                next(error)
            }
            res.send(mascota)
        })
})

router.post('/', function (req, res, next) {
    const data = req.body;
    const mascota = new Mascota(data.nombre, data.tipo, data.fechaNacimiento)

    db.mascotas
        .insert(mascota, function (error, mascotaInsertada) {
            if (error) {
                next(error)
            }
            res.send(mascotaInsertada)
        })
})

// ...

// Exportamos nuestro router
module.exports = router;