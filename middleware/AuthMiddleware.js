const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError')

const authError = (next) => {
    return next(ApiError.authError('Not authorized'));
}

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            authError(next);
        }
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (e) {
        authError(next);
    }
}