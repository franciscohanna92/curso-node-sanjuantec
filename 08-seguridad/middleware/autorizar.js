const jsonwebtoken = require('jsonwebtoken')

function autorizar(req, res, next) {
    // Obtenemos el token del header de autorización
    const token = req.get('Authorization').split('Bearer ')[1]

    try {
        // Verificamos y decodificamos el token
        const tokenDecodificado = jsonwebtoken.verify(token, process.env.CLAVE_SECRETA, {
            ignoreExpiration: false
        })

        // Pasamos el idUsuario al siguiente middleware
        res.locals.idUsuario = tokenDecodificado.idUsuario

        return next()
    } catch (error) {
        return next(error)
    }
}

module.exports = autorizar