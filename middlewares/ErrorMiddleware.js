const errorResponse = require("../utils/errorResponse")

const errorHandel = (err, req, res, next) => {
    let erro = { ...err }
    erro.message = err.message

    // mongoose cast error
    if (erro.name === 'castError') {
        const message = 'Response Not Found'
        error = new errorResponse(message, 404)
    }
    // duplicate key error
    if (erro.code === 11000) {
        const message = 'Duplicated field value entered'
        error = new errorResponse(message, 400)
    }
    // mongoose validation
    if (erro.name === 'validationError') {
        const message = Object.values(erro.errors).map(val => val.message)
        error = new errorResponse(message, 400)
        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || "Server Error"
        })
    }
}

module.exports = errorHandel