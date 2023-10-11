const Router = require('express');
const authController = require('../controllers/authController');
const router = new Router();
const {check} = require('express-validator');
const userController = require('../controllers/userController');

router.post('/registration',[
    check('username', 'Login can\'t be empty!').notEmpty(),
    check('password', 'Password can\'t be empty!').notEmpty(),
    check('name', 'Name can\'t be empty!').notEmpty()
], authController.registration)
router.post('/login', authController.login);
router.get('/users', authController.getUsers);
router.put('/users', userController.userBlock );
router.put('/users', userController.userUnblock);
router.delete('/users', userController.userDelete);

module.exports = router;