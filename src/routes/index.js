const router = require('express').Router();
const register = require('./register');
const login = require('./login');
const home = require('./home');
const user = require('./user');
const eventos = require('./eventos');

router.use('/register', register);
router.use('/login', login);
router.use('/home', home);
router.use('/user', user);
router.use('/eventos', eventos);

module.exports = router;
