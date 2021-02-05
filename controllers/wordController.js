const {Word} = require('../models/models')
const ApiError = require('../error/ApiError');

class WordController {
    async getWords(req, res) {
        const {user_id} = req.body;
        const words = await Word.findAll({where: {user_id}});
        return res.json(words);
    }

    async setWords(req, res, next) {
        try {
            const {id, word, transcription, translation, user_id} = req.body;
            const words = await Word.create({id, word, transcription, translation, user_id});
            return res.json(words);
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async updateWords(req, res, next) {
        try {
            const {id, word, transcription, translation, user_id} = req.body;
            await Word.update({word, transcription, translation}, {where: {user_id, id}})
            return res.json('Word updated successfully');
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async deleteWords(req, res, next) {
        try {
            const {id} = req.body;
            await Word.destroy({where: {id}});
            return res.json('Word deleted successfully');
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new WordController();