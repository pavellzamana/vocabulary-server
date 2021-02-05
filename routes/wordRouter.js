const Router = require('express');
const router = new Router();
const wordController = require('../controllers/wordController');

router.post('/find', wordController.getWords);
router.post('/words', wordController.setWords);
router.post('/add', wordController.setWords);
router.post('/update', wordController.updateWords);
router.post('/delete', wordController.deleteWords);

module.exports = router;