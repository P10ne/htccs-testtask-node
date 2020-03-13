const {compareSync} = require('bcryptjs');

const {sendJSONresponse, sendErrorResponse} = require('../utils/utils');
const usersCtrl = require('../controllers/usersController');
const {secret, tokens} = require('../config/config');
const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const tokenCtrl = require('./tokensController');

const generateAccessToken = (payload) => { // payload: userId
    const options = {expiresIn: tokens.access.expiresIn};
    return {
        token: jwt.sign(payload, secret, options),
        expiresAt: getExpiresAtTimestamp(tokens.access.expiresIn)
    }
};

const generateRefreshToken = (payloadArg) => { // payloadArgs: userId, fingerPrint
    const payload = {
        id: uuid(),
        ...payloadArg
    };
    const options = {expiresIn: tokens.refresh.expiresIn};

    return {
        id: payload.id,
        token: jwt.sign(payload, secret, options),
        expiresAt: getExpiresAtTimestamp(tokens.refresh.expiresIn),
        userId: payloadArg.userId
    }
};

const getExpiresAtTimestamp = (expiresIn) => {
    const currentDate = new Date();
    const expiresAtTimestamp = currentDate.setSeconds(currentDate.getSeconds() + expiresIn);
    return expiresAtTimestamp;
};

const login = async(req, res) => {
    const {login, password, fingerPrint} = req.body;
    const user = await usersCtrl.getUserByLogin(login, ['id', 'login', 'password']);
    if(!user || !compareSync(password, user.password)) {
        sendErrorResponse(res, 403, 'Неверный логин или пароль');
    }
    const accessToken = generateAccessToken({userId: user.id, roleId: user.role.id});
    const refreshToken = generateRefreshToken({
        userId: user.id,
        fingerPrint: fingerPrint
    });

    await tokenCtrl.add(refreshToken);

    const result = {
        accessToken,
        refreshToken: refreshToken.token,
        user: {
            id: user.id,
            login: user.login,
            role: user.role
        }
    };
    sendJSONresponse(res, 200, result);
};

const refresh = (req, res) => {
    const {refreshToken, fingerPrint} = req.body;

    jwt.verify(refreshToken, secret, async function(err, decoded) {
        if (err) {
            console.log('Ошибка в verify');
            sendErrorResponse(res, 401, 'Недействительный refreshToken');
        } else {
            if (decoded.fingerPrint === fingerPrint) {
                const refreshTokenFromDB = await tokenCtrl.getById(decoded.id);
                const user = await usersCtrl.getById(refreshTokenFromDB.userId);
                const newAccessToken = generateAccessToken({userId: user.id, roleId: user.role.id});
                const newRefreshToken = generateRefreshToken({userId: user.id, fingerPrint});
                await tokenCtrl.remove(decoded.id);


                await tokenCtrl.add(newRefreshToken);
                sendJSONresponse(res, 200,
                    {
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken.token
                    });
            } else {
                sendErrorResponse(res, 401, 'Недействительный fingerPrint');
            }
        }
    });
};

const logout = (req, res) => {
    sendJSONresponse(res, 200, 'success');
};

const withAccess = (roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization  && req.headers.authorization.replace('Bearer ', '');
        if (token) {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    console.log('Ошибка в verify', err);
                    sendErrorResponse(res, 401, 'Недействительный токен');
                } else {
                    console.log('roleId: ', decoded.roleId);
                    if (roles.includes(decoded.roleId)) {
                        console.log('успех');
                        next();
                    } else {
                        console.log('not includes');
                        sendErrorResponse(res, 401, 'Недействительный токен');
                    }
                }
            });
        } else {
            console.log('Недействительный токен');
            sendErrorResponse(res, 401, 'Недействительный токен');
        }
    }
};



module.exports = {
    login, logout, refresh, withAccess
};
