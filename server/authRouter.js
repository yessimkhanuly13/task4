const Router = require('express');
const authController = require('./authController');
const router = new Router();
const {check} = require('express-validator');

router.post('/registration',[
    check('username', 'Login can\'t be empty!').notEmpty(),
    check('password', 'Password can\'t be empty!').notEmpty(),
    check('name', 'Name can\'t be empty!').notEmpty()
], authController.registration)
router.post('/login', authController.login);
router.get('/users', authController.getUsers);

module.exports = router;