const { DataTypes } = require('sequelize');
const db = require("../db");

const Log = db.define("log", {
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    
    definition: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    result: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Log; 