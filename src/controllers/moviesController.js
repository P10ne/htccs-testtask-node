const {Movies} = require('../models/models');
const {sendJSONresponse} = require('../utils/utils');
const multer = require('multer');

const previewsDir = 'http://localhost:3000/uploads/';

const add = async (req, res) => {
    let previewName = '';
    const storage = multer.diskStorage({
        destination: function(req, res, cb) {
            cb(null, 'src/uploads')
        },
        filename: function(req, file, cb) {
            previewName = `${Date.now()}_${file.originalname}`;
            cb(null, previewName)
        }
    });
    const upload = multer({storage: storage}).single('preview');
    upload(req, res, async function(err) {
        if(err) {
            previewName = `default_preview.png`;
            console.error(err);
        } else {
            console.log('success multer');
        }
        const addedMovie = await Movies.create({...req.body, preview: `${previewName}`});
        sendJSONresponse(res, 200, addedMovie);
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
        movie.preview = `${previewsDir}/${movie.preview}`;
        return movie;
    });
    sendJSONresponse(res, 200, result);
};
const getById = async (req, res) => {
    const movie = await Movies.findByPk(req.params.id);
    movie.preview = `${previewsDir}/${movie.preview}`;
    sendJSONresponse(res, 200, movie);
};

module.exports = {
    add, update, remove, get, getById
};
