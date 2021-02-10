const ApiError = require('../error/ApiError');
const wordsServiceDB = require('../services/wordServiceDB')

class WordController {
    async getWords(req, res) {
        const {user_id} = req.body;
        const words = await wordsServiceDB.getWordsFromDB(user_id);
        return res.json(words);
    }

    async setWords(req, res, next) {
        try {
            const {id, word, transcription, translation, user_id} = req.body;
            await wordsServiceDB.addWordToDB(id, word, transcription, translation, user_id);
            return res.json('Word added to database');
        } catch (e) {
            return next(ApiError.internalError())
        }
    }

    async updateWords(req, res, next) {
        try {
            const {id, word, transcription, translation, user_id} = req.body;
            await wordsServiceDB.updateWordToDB(id, word, transcription, translation, user_id);
            return res.json('Word updated successfully');
        } catch (e) {
            return next(ApiError.internalError());
        }
    }

    async deleteWords(req, res, next) {
        try {
            const {id} = req.body;
            await wordsServiceDB.deleteWordFromDB(id);
            return res.json('Word deleted successfully');
        } catch (e) {
            return next(ApiError.internalError());
        }
    }
}

module.exports = new WordController();