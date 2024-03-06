// will need to install these npm install dotenv
// npm install sequelize pg pg-hstore for database

// npm install axios for axios
const sequelize = require('./database')

let numOfFortunes = 3
let userID = 0 // maybe could have loggedUser in the frontend
let registered = 1

// const fortunes = [`You're gonna go far`, `You got this`, `Tomorrow is another day`]

module.exports = {
    getFortunes: (req, res) => {
        let fortunes = [] // holds the fortunes
        let fortuneIDs = [] // tracks the fortuneID already grabbed to prevent doubles
        let i = 0
        while(i < numOfFortunes) {
            let randomFortuneID = Math.floor(Math.random() * 3) + 1// as id will likely start at 1, not 0
            if(!fortuneIDs.includes(randomFortuneID)) { // change this and below with sequelize queries to select the fortune based off id 
                sequelize.query(`
                SELECT * FROM fortunes
                WHERE fortune_id = ${randomFortuneID}
                `).then(fortune => {
                fortunes.push(fortune);
                sequelize.query(`
                    SELECT * FROM user_fortunes
                    WHERE user_id = ${userID} AND fortune_id = ${randomFortuneID}
                    `).then(existingAssociations => {
                    if (existingAssociations.length === 0) {
                        sequelize.query(`
                            INSERT INTO user_fortunes (user_id, fortune_id)
                            VALUES (${userID}, ${randomFortuneID})
                            `).then(() => {
                            console.log('Added new unique obtained fortune to user');
                            }).catch(error => {
                            console.error('Error inserting user_fortunes:', error);
                            });
                    } else {
                        console.log('Fortune already obtained by user');
                    }
                    }).catch(error => {
                    console.error('Error selecting existing associations:', error);
                    });
                }).catch(error => {
                console.error('Error selecting fortune:', error);
                });

            fortuneIDs.push(randomFortuneID);
            i++;
            }
        }
        res.status(200).send(fortunes)
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
            SELECT fortunes.fortune, fortunes.fortune_id
            FROM users
            JOIN user-fortunes ON users.user_id = user-fortunes.user_id
            JOIN fortunes ON user-fortunes.fortune_id = fortunes.fortune_id
            WHERE users.user_id = ${userID};
        `).then(results => {
            const fortunes = results[0]; // Extract the fortunes and their id from the array
    
            // Send the fortunes array as the response
            res.status(200).send(fortunes)
            }).catch(error => {
            console.error('Error fetching fortunes:', error)
            res.status(500).send('Internal Server Error')
            })
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
    },
    signOut: (req, res) => {
        userID = 0
        res.status(200).send('User signed out')
    }
}