// will need to install these npm install dotenv
// npm install sequelize pg pg-hstore for database

// npm install axios for axios
const sequelize = require('./database')

let numOfFortunes = 3
let userID = 0 // maybe could have loggedUser in the frontend
let registered = 1

const fortunes = [`You're gonna go far`, `You got this`, `Tomorrow is another day`]

module.exports = {
    getFortunes: (req, res) => {
        let fortune = []
        let i = 0
        while(i < numOfFortunes) {
            let randomFortunes = Math.floor(Math.random() * 3)
            if(!fortune.includes(fortunes[randomFortunes])) {
                gotFortune[randomFortunes] = fortunes[randomFortunes] // should update collection with correct spot related to fortune to display it if it was gotten
                fortune.push(fortunes[randomFortunes])
                i++
            }
        }
        res.status(200).send(fortune)
    },
    login: (req, res) => {
        const {username, password} = req.body

        sequelize.query(`
            SELECT * FROM users
            WHERE username = '${username}' and password = '${password}'
        `).then(dbRes => {
            if(dbRes[0].length > 0) {
                userID = dbRes[0].user_id // should assign id of user that's logging in
                res.status(200).send(dbRes[0])
            } else {
                res.status(404).send("User not found")
            }
        }).catch(err => console.log(err))
    },
    register: (req, res) => {
        const {username, password} = req.body

        sequelize.query(`
            INSERT INTO users (username, password)
            VALUES('${username}', '${password}')
        `).then(dbRes => {
            userID = registered // should make userID equal to what should be the id assigned to newest user
            registered++ // increments registered so it'll be the id value of new user
            res.status(200).send(`Welcome aboard, ${username}`)
        }).catch(err => {
            if(err.original && err.original.code === 'ER_DUP_ENTRY') {
                res.status(400).send('User already exists')
            } else {
                console.log(err);
                res.status(500).send('Internal server error')
            }
        })
    },
    updateNumber: (req, res) => {
        //console.log('Updated number of Fortunes in display set')
        const {updateNumber} = req.body
        //console.log(updateNumber)

        if(updateNumber <= 3 && updateNumber > 0 && updateNumber != numOfFortunes) {
            numOfFortunes = updateNumber
            //console.log(numOfFortunes)
            res.status(200).send(`Updated number of fortunes in display set to ${numOfFortunes}`)
        } else if(updateNumber === numOfFortunes) {
            res.status(400).send('Number of fortunes is already this number')
            //alert('Number of fortunes is already this number')
        } else {
            res.status(400).send('Invalid number to update to')
        }
    },
    getList: (req, res) => {
        sequelize.query(`
            SELECT fortunes.fortune 
            FROM users
            JOIN user-fortunes ON users.user_id = user-fortunes.user_id
            JOIN fortunes ON user-fortunes.fortune_id = fortunes.fortune_id
            WHERE users.user_id = ${userID};
        `)
    },
    getUser: (req, res) => { // should get username and user_id with the id currently in userID to show the username and id of the user currently logged in
        sequelize.query(`
            SELECT username, user_id FROM users
            WHERE users.user_id = ${userID};
        `).then(dbRes => {
            res.status(200).send(dbRes[0])
        }).catch(err => {
            console.log(err);
            res.status(500).send('Internal server error')
        })
    }
}