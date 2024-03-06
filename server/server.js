
const express = require('express')
const app = express()
const cors = require('cors')

const sequelize = require('./database.js')

sequelize.sync()

const seed = require('./seed.js')
const {register, login, getFortunes, updateNumber} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.post('/seed', seed)

app.post('/register', register) // register a new user

app.post('/login', login) // login user if correct username and password is entered

app.put('/fortunes', updateNumber) // change number of Fortunes to be displayed

app.get('/fortunes', getFortunes) //get fortunes

app.get('/getList', getList)