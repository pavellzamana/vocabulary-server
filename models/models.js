const sequelize = require('../db');
const DataTypes = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
});

const Word = sequelize.define('word', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    word: {type: DataTypes.STRING},
    transcription: {type: DataTypes.STRING},
    translation: {type: DataTypes.STRING},
    user_id: {type: DataTypes.INTEGER}
});




module.exports = {Word, User};