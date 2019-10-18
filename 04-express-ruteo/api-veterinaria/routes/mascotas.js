// Importamos el submódulo Router
const { Router } = require('express')

// Importamos la base de datos
const db = require('../database')

// Instanciamos un router
const router = Router()

// Definir el resto de las rutas de mascotas aquí
router.get('/', function (req, res, next) {
    db.mascotas.find({}, function (error, mascotas) {
        if (error) {
            next(error)
        }
        res.send(mascotas)
    })
})

// ...

// Exportamos nuestro router
module.exports = router;