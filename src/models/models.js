const Sequelize = require('sequelize');
const sequelize = require('../sequalize');

const Movies = sequelize.define("movie", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    genre: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.INTEGER
    },
    imgSrc: {
        type: Sequelize.STRING
    }
});

const Comments = sequelize.define("comment", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING
    }
});

const Users = sequelize.define("user", {
   id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       primaryKey: true,
       allowNull: false
   },
    login: {
       type: Sequelize.STRING
    },
    password: {
       type: Sequelize.STRING
    }
});

const Roles = sequelize.define("role", {
   id: {
       type: Sequelize.INTEGER,
       autoIncrement: true,
       primaryKey: true,
       allowNull: false
   },
    description: {
       type: Sequelize.STRING
    }
});

Users.belongsTo(Roles);
Roles.hasMany(Users);

module.exports = {
    Movies,
    Comments,
    Users,
    Roles
};
