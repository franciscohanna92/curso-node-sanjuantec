const { Router } = require('express')
const router = Router()

// Middleware
const { validarId } = require('../middleware/validadores')

router.options('/', function (req, res, next) {
    res.header('Location', 'GET, POST, PATCH, DELETE')
        .send()
})

router.get('/', function (req, res, next) {
    let query = req.query
    res.send(query)
})

router.get('/:id', validarId, function (req, res, next) {
    res.send({
        id
    })
})

router.post('/', function (req, res, next) {
    res.send()
})

router.delete('/:id', validarId, function (req, res, next) {
    let id = req.params.id
    res.send({
        id
    })
})

router.patch('/:id', validarId, function (req, res, next) {
    res.send({
        id
    })
})

module.exports = router;
