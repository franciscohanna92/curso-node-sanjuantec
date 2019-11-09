const { Router } = require('express')
const router = Router()

const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

const db = require('../database')
const Usuario = require('../database/modelos/Usuario')

router.post('/', function (req, res, next) {
    const { email, password, rol } = req.body

    bcrypt.hash(password, 10, function (error, passwordHasheado) {
        if (error) {
            return next(error)
        }

        let usuario = new Usuario(email, passwordHasheado, rol);

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

        bcrypt.compare(password, usuario.password, function (error, coinciden) {
            if (error) {
                return next(error)
            }

            if (!coinciden) {
                return next(error)
            }

            const payload = {
                iss: 'api.veterinaria.com',
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                idUsuario: usuario._id,
                rol: usuario.rol
            }

            const jwt = jsonwebtoken.sign(payload, process.env.CLAVE_SECRETA)

            res.status(200)
                .send({
                    token: jwt
                })
        })
    })
})

module.exports = router;
