const {Tokens} = require('../models/models');

const add = async (token) => {
  const addedToken = await Tokens.create(token);
  return addedToken || false;
};

const remove = async (id) => {
  const removedToken = await Tokens.destroy({where: {id: id}});
  return removedToken || false;
};

const getById = async (id) => {
  const token = await Tokens.findByPk(id);
  return token || null;
};

module.exports = {
  add, remove, getById
};
