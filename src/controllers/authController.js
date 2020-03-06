const {compareSync} = require('bcryptjs');

const {sendJSONresponse, sendErrorResponse} = require('../utils/utils');
const {getUserByLogin} = require('../controllers/usersController');
const config = require('../config/config');
const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');


const login = async(req, res) => {
    const {login, password} = req.body;
    console.log(login);
    const user = await getUserByLogin(login, ['id', 'login', 'password']);
    if(!user || !compareSync(password, user.password)) {
        sendErrorResponse(res, 403, 'Неверный логин или пароль');
    }
    const refreshToken = uuid();
    const result = {
        token: jwt.sign({id: user.id}, config.secret, {expiresIn: 20}),
        refreshToken
    };
    sendJSONresponse(res, 200, result);
};

module.exports = {
    login
};
