const Sequelize = require('sequelize');

const db = new Sequelize("postgres://postgres:USIxc007!@localhost:5432/workoutlog");

module.exports = db;