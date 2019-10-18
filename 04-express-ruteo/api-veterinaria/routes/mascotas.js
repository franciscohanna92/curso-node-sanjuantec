// Importamos el submódulo Router
const { Router } = require('express')

// Importamos modulo para validacion de IDs
const validator = require('validator')

// Importamos la base de datos y los modelos
const db = require('../database')
const Mascota = require('../database/models/mascotas.model')

// Instanciamos un router
const router = Router()

// Ruta para obtener todas las mascotas
router.get('/', function (req, res, next) {
    // Aca deben verifiar si hay query string
    // En caso de existir, filtrar segun los parametros

    db.mascotas.find({}, function (error, mascotas) {
            if (error) {
                next(error)
            }
            res.send(mascotas)
        })
})

// Ruta para obtener los datos de una mascota en particular
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

// Ruta para crear una mascota
router.post('/', function (req, res, next) {
    const data = req.body;

    // Opcionalmente, aqui puede validar los datos del body
    // Como por ejemplo, que la fecha de nacimiento tenga el formato correcto

    const mascota = new Mascota(data.nombre, data.tipo, data.fechaNacimiento)

    db.mascotas
        .insert(mascota, function (error, mascotaInsertada) {
            if (error) {
                next(error)
            }
            res.send(mascotaInsertada)
        })
})

// Definir el resto de las rutas necesarias aqui debajo
// ...

// Exportamos nuestro router
module.exports = router;