const {User} = require('../models/models');

const userServiceDB = {
    getUserFromDB: (login) => User.findOne({where: {login}}),
    addUser: (email, login, password) => User.create({email, login, password})
};

module.exports = userServiceDB;