const bcript = require('bcryptjs');
const {Users, Roles} = require('../models/models');
const {sendJSONresponse} = require('../utils/utils');

const addRequest = async (req, res) => {
    const addedUser = await add(req.body);
    sendJSONresponse(res, 200, addedUser);
};
const add = async (payload) => {
    payload.login = payload.login.toLowerCase();
    payload.password = bcript.hashSync(payload.password, 10);
    return Users.create(payload);
};

const update = async (req, res) => {
    const received = req.body;
    received.login = received.login.toLowerCase();
    if(received.password === '') {
        const toUpdateFromDB = await Users.findByPk(req.params.id);
        const oldPassword = toUpdateFromDB.password;
        received.password = oldPassword;
    }
    const updatedUser = await Users.update(received, {where: {id: req.params.id}});
    sendJSONresponse(res, 200, updatedUser);
};

const remove = async (req, res) => {
    const deletedUser = await Users.destroy({where: {id: req.params.id}});
    sendJSONresponse(res, 200, deletedUser);
};

const get = async (req, res) => {
    if (req.query.login) {
        getUserByLoginRequest(req, res);
    } else {
        getUsers(req, res);
    }
};

const getUsers = async (req, res) => {
    const users = await Users.findAll({
        where: req.body.condition,
        attributes: ['id', 'login'],
        include: [Roles]
    });
    sendJSONresponse(res, 200, users);
};

const getUserByLoginRequest = async (req, res) => {
   const user = await getUserByLogin(req.query.login);
   sendJSONresponse(res, 200, user);
};

const getUserByLogin = async (login, attributes = ['id', 'login']) => {
    const user = await Users.findOne({
        where: {login: login.toLowerCase()},
        attributes,
        include: [Roles]
    });
    return user;
};



const getByIdRequest = async (req, res) => {
    const user = getById(req.params.id);
    sendJSONresponse(res, 200, user);
};
const getById = (id, attributes = ['id', 'login']) => {
    const user = Users.findByPk(id, {
        attributes,
        include: [Roles]
    });
    return user;
};



module.exports = {
    addRequest, update, remove, get, getByIdRequest, getById, getUserByLogin
};
