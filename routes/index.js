const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const wordRouter = require('./wordRouter');

router.use('/users', userRouter);
router.use('/words', wordRouter);

module.exports = router;