require('dotenv').config()
const {CONNECTION_STRING} = process.env
console.log(typeof CONNECTION_STRING)
const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres'
})

module.exports = sequelize