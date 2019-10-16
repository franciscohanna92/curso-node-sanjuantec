function logger(request, response, next) {
    let method = request.method
    let url = request.url
    let date = new Date()
    
    let timestamp = date.toISOString()
    
    console.log(`${timestamp} - ${method} ${url}`)
    next()
}

module.exports = logger;