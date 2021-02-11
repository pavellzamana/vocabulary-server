const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userServiceDB = require('../services/userServiceDB');

const generateJwt = async (login, next) => {
    const userid = await userServiceDB.getUserFromDB(login);
    const token = jwt.sign({id: userid.id, login, email: userid.email}, process.env.SECRET_KEY, {
        expiresIn: "48h"});
    if (!token) {
        return next(ApiError.internalError('Error generating token. Please try again'));
    }
    return token;
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, login, password} = req.body;
            const hashPassword = await bcrypt.hash(password, 3);
            await userServiceDB.addUser(email, login, hashPassword);
            const token = await generateJwt(login, next);
            return res.json({token});
        } catch (e) {
            return next(ApiError.internalError(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const {login, password} = req.body;
            const user = await userServiceDB.getUserFromDB(login);
            if (!user) {
                return next(ApiError.authError('User not found'));
            }
            let comparePass = bcrypt.compareSync(password, user.password);
            if (!comparePass) {
                return next(ApiError.authError('Invalid credentials'));
            }
            const token = await generateJwt(login);
            return (res.json({token}));
        } catch (e) {
            return next(ApiError.internalError(e.message));
        }
    }
}

module.exports = new UserController();