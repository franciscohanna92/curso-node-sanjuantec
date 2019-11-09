const { Router } = require('express')
const router = Router()

const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const db = require('../database')
const Usuario = require('../database/modelos/Usuario')

router.post('/', function (req, res, next) {
    const { email, password, rol } = req.body

    // Hasheamos el password
    bcrypt.hash(password, 10, function (error, passwordHasheado) {
        if (error) {
            return next(error)
        }

        // Creamos el nuevo usuario con el password hasheado
        let usuario = new Usuario(email, passwordHasheado, rol);

        // Insertamos el usuario en la base de datos
        db.usuarios.insert(usuario, function (error, usuarioCreado) {
            if (error) {
                return next(error)
            }

            res.status(204)
                .send()
        })
    })
})

router.post('/token', function (req, res, next) {
    const { email, password } = req.body

    // Verificar que existe usuario
    db.usuarios.findOne({ email }, function (error, usuario) {
        if (error) {
            return next(error)
        }

        if (!usuario) {
            error = new Error('El usuario no existe')
            return next(error)
        }

        // Comparamos los hashes
        bcrypt.compare(password, usuario.password, function (error, coinciden) {
            if (error) {
                return next(error)
            }

            if (!coinciden) {
                const error = new Error('Contraseña incorrecta')
                return next(error)
            }

            // Creamos la carga del util del JWT
            const payload = {
                iss: 'api.veterinaria.com',
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                idUsuario: usuario._id,
                rol: usuario.rol
            }

            // Generamos el token
            const jwt = jsonwebtoken.sign(payload, process.env.CLAVE_SECRETA)

            res.status(201)
                .send({
                    token: jwt
                })
        })
    })
})

module.exports = router;
