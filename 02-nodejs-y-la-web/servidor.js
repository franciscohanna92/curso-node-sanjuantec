const lodash = require('lodash');
const http = require('http')
const url = require('url')

const PORT = 3000;

const server = http.createServer(listener)

server.on('listening', () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})

const users = [
    {
        id: 1,
        name: 'pepito'
    },
    {
        id: 2,
        name: 'juanita'
    }
]

function listener(request, response) {

    let data = []
    request.on('data', chunk => {
        data.push(chunk)
    })
    request.on('end', () => {
        let dataObject
        if (data.length > 0) {
            dataObject = JSON.parse(data)
        }

        let urlObject = url.parse(request.url, true, false);
        response = handleRequest(urlObject, request.method, response, dataObject)
        response.end();
    })
}

function handleRequest(urlObject, method, response, data) {
    
    try {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        })

        switch (urlObject.pathname) {
            case '/users':
                let userId = urlObject.query.id;
                switch (method) {
                    case 'GET':
                        if (userId) {
                            let user = lodash.find(users, (user) => user.id == userId)
                            response.write(JSON.stringify(user))
                        } else {
                            response.write(JSON.stringify(users))
                        }
                        break;
                    case 'POST':
                        users.push(data);
                        break;
                }

                break;
            default:
                    response.statusCode = 400
                break;
        }
    } catch (error) {
        response.statusCode = 500
        response.write(error.message)
    }
    return response;
}

server.listen(PORT)
