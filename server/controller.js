// will need to install these npm install dotenv
// npm install sequelize pg pg-hstore for database

// npm install axios for axios
const sequelize = require('./database')

let numOfFortunes = 3
let userID = 0

module.exports = {
    getFortunes: async (req, res) => {
        try {
            let fortunes = []; // Holds the fortunes
            let fortuneIDs = []; // Tracks the fortuneID already grabbed to prevent doubles
            let i = 0;
            console.log(numOfFortunes)
            while(i < numOfFortunes) {
                let randomFortuneID = Math.floor(Math.random() * 9) + 1; // As id will likely start at 1, not 0
                if(!fortuneIDs.includes(randomFortuneID)) {
                    // Fetch fortune
                    const [fortune] = await sequelize.query(`
                        SELECT * FROM fortunes
                        WHERE fortune_id = ${randomFortuneID}
                    `);
                    fortunes.push(fortune);
                    
                    // Check if user already has the fortune
                    const [existingAssociations] = await sequelize.query(`
                        SELECT * FROM user_fortunes
                        WHERE user_id = ${userID} AND fortune_id = ${randomFortuneID}
                    `);
                    
                    if (existingAssociations.length === 0) {
                        // Insert new association if not already obtained
                        await sequelize.query(`
                            INSERT INTO user_fortunes (user_id, fortune_id)
                            VALUES (${userID}, ${randomFortuneID})
                        `);
                        console.log('Added new unique obtained fortune to user');
                    } else {
                        console.log('Fortune already obtained by user');
                    }
                    
                    fortuneIDs.push(randomFortuneID);
                    i++;
                }
            }
            console.log(fortunes)
            res.status(200).send(fortunes);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        }
    },
    login: (req, res) => {
        const {username, password} = req.body

        sequelize.query(`
            SELECT * FROM users
            WHERE username = '${username}' and password = '${password}'
        `).then(dbRes => {
            if(dbRes[0].length > 0) {
                const user = dbRes[0][0]
                userID = user.user_id // should assign id of user that's logging in
                res.status(200).send(`Welcome back, ${user.username}`)
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
            res.status(200).send(`New user ${username} registered`)
        }).catch(err => {
            if(err.original.constraint === 'users_username_key') {
                res.status(400).send('User already exists')
            } else {
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
            JOIN user_fortunes ON users.user_id = user_fortunes.user_id
            JOIN fortunes ON user_fortunes.fortune_id = fortunes.fortune_id
            WHERE users.user_id = ${userID}
            ORDER BY fortunes.fortune_id ASC; 
        `).then(results => { // Order by fortune_id ascending;
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