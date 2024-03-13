
const express = require('express')
const app = express()
const cors = require('cors')

const sequelize = require('./database.js')

sequelize.sync()

const {SERVER_PORT} = process.env
const seed = require('./seed.js')
const {register, login, getFortunes, updateNumber, getList, signOut, getUser} = require('./controller.js')

app.use(express.json())
app.use(cors())

app.post('/seed', seed)

app.post('/register', register) // register a new user

app.post('/login', login) // login user if correct username and password is entered

app.put('/fortunes', updateNumber) // change number of Fortunes to be displayed

app.get('/fortunes', getFortunes) //get fortunes

app.get('/getList', getList) // should get a table of all fortunes obtained by currently logged in user

app.get('/signout', signOut) // signs user out and returns to login page

app.get('/user', getUser) // gets username and userID of currently logged in user

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))