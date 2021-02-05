const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/AuthMiddleware');

router.get('/auth', authMiddleware, userController.checkLogin);
router.post('/register', userController.registration);
router.post('/login', userController.login);

module.exports = router;