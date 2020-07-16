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
    preview: {
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

Comments.belongsTo(Movies);
Movies.hasMany(Comments);

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

Comments.belongsTo(Users);
Users.hasMany(Comments);

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

const Tokens = sequelize.define("token", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    expiresAt: {
        type: Sequelize.BIGINT
    },
    token: {
        type: Sequelize.STRING
    }
});
Tokens.belongsTo(Users);
Users.hasMany(Tokens);

module.exports = {
    Movies,
    Comments,
    Users,
    Roles,
    Tokens
};
