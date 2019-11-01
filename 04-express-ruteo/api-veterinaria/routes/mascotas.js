// Importamos el submódulo Router
const { Router } = require('express')

// Importamos nuestros middleware
const {validarIdMascota} = require('../middleware/validadores')

// Importamos la base de datos y los modelos
const db = require('../database')
const Mascota = require('../database/models/mascotas.model')

// Instanciamos un router
const router = Router()

function parsearParam(paramValue) {
    if (paramValue == 'true') {
        return true
    }
    if (paramValue == 'false') {
        return false
    }
    return paramValue
}

// Ruta para obtener todas las mascotas
router.get('/', function (req, res, next) {
    let consultaMascota = {}
    const query = req.query;

    if (Object.keys(query).length > 0) {
        for (param in query) {
            consultaMascota[param] = parsearParam(query[param])
        }
    }

    db.mascotas.find(consultaMascota, function (error, mascotas) {
        if (error) {
            return next(error)
        }
        res.send(mascotas)
    })
})

// Ruta para obtener los datos de una mascota en particular
router.get('/:idMascota', validarIdMascota, function (req, res, next) {
    const idMascota = req.params.idMascota;

    db.mascotas
        .findOne({ _id: idMascota }, function (error, mascota) {
            if (error) {
                return next(error)
            }
            res.send(mascota)
        })
})

// Ruta para crear una mascota
router.post('/', function (req, res, next) {
    const data = req.body;

    // Opcionalmente, aqui puede validar los datos del body
    // Como por ejemplo, que la fecha de nacimiento tenga el formato correcto

    const mascota = new Mascota(data.nombre, data.tipo, data.esDeRaza, data.raza, data.fechaNacimiento)

    db.mascotas
        .insert(mascota, function (error, mascotaInsertada) {
            if (error) {
                return next(error)
            }
            res.header('Location', `/mascotas/${mascotaInsertada._id}`)
                .status(201)
                .send()
        })
})

// Ruta para eliminar una mascota
router.delete('/:idMascota', validarIdMascota, function (req, res, next) {
    const idMascota = req.params.idMascota;

    db.mascotas.remove({ _id: idMascota }, function (error, seEliminoLaMascota) {
        if (error) {
            return next(error)
        }

        if (seEliminoLaMascota) {
            res.status(204)
                .send({})
        } else {
            return next({
                mensaje: "La mascota no pudo ser eliminada",
                status: 500
            })
        }
    })
})

// Ruta para actualizar una mascota
router.patch('/:idMascota', validarIdMascota, function (req, res, next) {
    const data = req.body
    const idMascota = req.params.idMascota;

    db.mascotas
        .findOne({ _id: idMascota }, function (error, mascotaParaActualizar) {
            if (error) {
                return next(error)
            }

            for (param in data) {
                if (mascotaParaActualizar.hasOwnProperty(param)) {
                    mascotaParaActualizar[param] = parsearParam(data[param])
                }
            }

            db.mascotas.update({ _id: idMascota }, mascotaParaActualizar, {returnUpdatedDocs: true}, function (error, seActualizoLamascota, mascotaActualizada) {
                if (error) {
                    return next(error)
                }

                if (seActualizoLamascota) {
                    res.send(mascotaActualizada)
                } else {
                    return next({
                        mensaje: 'No se pudo actualizar la mascota',
                        status: 500
                    })
                }
            })
        })
})

// Exportamos nuestro router
module.exports = router;
