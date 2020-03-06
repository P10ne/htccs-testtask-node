const {Movies} = require('../models/models');
const {sendJSONresponse} = require('../utils/utils');
const multer = require('multer');

const add = async (req, res) => {
    let previewName = '';
    const storage = multer.diskStorage({
        destination: function(req, res, cb) {
            cb(null, 'uploads')
        },
        filename: function(req, file, cb) {
            previewName = `${Date.now()}_${file.originalname}`;
            cb(null, previewName)
        }
    });
    const upload = multer({storage: storage}).single('preview');
    upload(req, res, async function(err) {
        if(err) {
            console.error(err);
        } else {
            const addedMovie = await Movies.create({...req.body, imgSrc: ``});
            sendJSONresponse(res, 200, addedMovie);
        }
    });
};
const update = async (req, res) => {
    const updatedMovie = await Movies.update(req.body, {where: {id: req.params.id}});
    sendJSONresponse(res, 200, updatedMovie);
};
const remove = async (req, res) => {
    const deletedMovie = await Movies.destroy({where: {id: req.params.id}});
    sendJSONresponse(res, 200, deletedMovie);
};
const get = async (req, res) => {
    const movies = await Movies.findAll({where: req.body.condition});
    const result = movies.map(movie => {
        movie.imgSrc = `http://localhost:3000/uploads/${movie.imgSrc}`;
        return movie;
    });
    sendJSONresponse(res, 200, result);
};
const getById = async (req, res) => {
    const movie = await Movies.findByPk(req.params.id);
    sendJSONresponse(res, 200, movie);
};

module.exports = {
    add, update, remove, get, getById
};
