const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const wordRouter = require('./wordRouter');
const {errorHandling} = require('../error/ApiError')

router.use('/users', userRouter, errorHandling);
router.use('/words', wordRouter, errorHandling);

module.exports = router;