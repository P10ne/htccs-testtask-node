const Sequelize = require("sequelize");

const pgSequelize = new Sequelize("test", "postgres", "Zgthiby56", {
    dialect: "postgres",
    host: "localhost",
    define: {
        timestamps: false
    }
});

module.exports = pgSequelize;
