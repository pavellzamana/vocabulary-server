class ApiError {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }

    static internalError (message) {
        return new ApiError(500, message);
    }

    static authError (message) {
        return new ApiError(401, message);
    }

    static errorHandling(err, req, res, next) {
        return res.status(err.status).json({message: err.message});
    }
}

module.exports = ApiError;