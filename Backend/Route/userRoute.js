const { registerUser, login, getUser } = require('../Controller/userController');
const { auth } = require('../Middleware/auth');

const route = require('express').Router()

route.post('/', registerUser);

route.post('/login', login)

route.get('/', auth, getUser);


module.exports = route;
