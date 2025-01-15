const ErrorHandler = require("../utils/errorHandler")

const errorMiddleware = (err, req, res, next) => {
    console.log("Error Middleware: ",err.statusCode, err.message, err.success, err?.error?.name, err?.error?.code, err.error);

    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'
    err.success = err.success
    err.error = err.error

    // Worng Mongodb Id error
    if (err?.error?.name === 'CastError') {
        const message = `Resource not found. Invalid ${err.error.path}`
        err = new ErrorHandler(message, 400, err.error.message)
    }

    //Mongoose duplicate key error.
    if (err?.error?.code == 11000) {
        const message = `Duplicate ${Object.keys(err.error.keyValue)} Entered`
        err = new ErrorHandler(message, 400, err.error.message)
    }

    // Mongoose or MongoDB related error
    if (
        err?.error?.name === 'MongooseError' ||
        err?.error?.name === 'MongoError'
    ) {
        const message = `Mongoose Database Error`
        err = new ErrorHandler(message, 500, err.error.message)
    }

    // Wrong JWT error.
    if (err?.error?.name === 'JsonWebTokenError') {
        const message = `Json Web Token is invalid, Try again.`
        err = new ErrorHandler(message, 400)
    }

    // JWT Expire error.
    if (err?.name === 'TokenExpiredError') {
        const message = `Json Web Token is Expired, Try again.`
        err = new ErrorHandler(message, 400)
    }

    console.log('Error: ', err)
    res.status(err.statusCode).json({
        ResponseCode: err.statusCode,
        ResponseMessage: err.message,
        succeeded: err.success,
        ResponseData: err?.error?.message ? err.error.message : err.error,
    })
}

const SuccessHandler = async (req, res, message, status = 200, data = null) => {
    const success = status == 207 ? false : true
    return res
        .status(status)
        .json({
            ResponseCode: status,
            ResponseMessage: message,
            succeeded: success,
            ResponseData: data,
        })
}
module.exports = {
    errorMiddleware,
    SuccessHandler,
}
