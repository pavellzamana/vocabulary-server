const ApiError = require('../error/ApiError');
const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = async (login) => {
    const userid = await User.findOne({where: {login}});
    return jwt.sign({id: userid.id, login, email: userid.email}, process.env.SECRET_KEY, {
        expiresIn: "48h"
    });
}

class UserController {
    async registration(req, res, next) {
        try {
            const {email, login, password} = req.body;
            const hashPassword = await bcrypt.hash(password, 3);
            await User.create({email, login, password: hashPassword});
            const token = await generateJwt(login);
            return res.json({token});
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        try {
            const {login, password} = req.body;
            const user = await User.findOne({where: {login}});
            if (!user) {
                return next(ApiError.badRequest('User not found'));
            }
            let comparePass = bcrypt.compareSync(password, user.password);
            if (!comparePass) {
                return next(ApiError.badRequest('Invalid credentials'));
            }
            const token = await generateJwt(login);
            return (res.json({token}));
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async checkLogin(req, res) {
       const token = await generateJwt(req.user.login);
       return res.json({token})
    }
}

module.exports = new UserController();