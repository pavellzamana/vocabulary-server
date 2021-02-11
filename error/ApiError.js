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
        if (err instanceof ApiError) {
            return res.status(err.status).json({message: err.message});
        }
        return next(ApiError.internalError('Unexpected Error'));
    }
}

module.exports = ApiError;