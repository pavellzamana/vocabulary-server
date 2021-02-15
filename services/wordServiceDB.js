const {Word} = require('../models/models');

const wordsServiceDB = {
    getWordsFromDB: (user_id) => Word.findAll({where: {user_id}}),
    addWordToDB: (id, word, transcription, translation, user_id) =>
        Word.create({id, word, transcription, translation, user_id}),
    updateWordToDB: (id, word, transcription, translation, userId) =>
        Word.update({word, transcription, translation}, {where: {user_id: userId, id}}),
    deleteWordFromDB: (id) => Word.destroy({where: {id}})
}


module.exports = wordsServiceDB;
