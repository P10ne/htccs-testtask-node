const {Comments, Users} = require('../models/models');
const {sendJSONresponse} = require('../utils/utils');

const add = async (req, res) => {
    const addedComment = await Comments.create(req.body.payload);
    sendJSONresponse(res, 200, addedComment);
};
const update = async (req, res) => {
    const updatedComment = await Comments.update(req.body.payload, {where: {id: req.params.id}});
    sendJSONresponse(res, 200, updatedComment);
};
const remove = async (req, res) => {
    const deletedComment = await Comments.destroy({where: {id: req.params.id}});
    sendJSONresponse(res, 200, deletedComment);
};
const get = async (req, res) => {
    const comments = await Comments.findAll(
        {
            where: {
                movieId: req.query.movieId,
            },
            attributes: ['id', 'value'],
            include: [
                {
                    model: Users,
                    attributes: ['id', 'login']
                }
            ]
        });
    sendJSONresponse(res, 200, comments);
};
const getById = async (req, res) => {
    const comment = await Comments.findByPk(req.params.id);
    sendJSONresponse(res, 200, comment);
};

module.exports = {
    add, update, remove, get, getById
};
