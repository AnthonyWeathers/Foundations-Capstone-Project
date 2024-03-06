const sequelize = require('./database.js')

const seed = () => {
    sequelize.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS fortunes;
    DROP TABLE IF EXISTS users-fortunes;
    
    create table users (
        user_id serial primary key, 
        username varchar(255) UNIQUE,  
        password varchar(255)
    );

    create table fortunes (
        fortune_id serial primary key,
        fortune varchar(255),
    );

    create table user-fortunes (
        user_id integer not null references users(user_id),
        fortune_id integer not null references fortunes(fortune_id)
    );
    `).then(() => {
        console.log('DB seeded!')
        res.sendStatus(200)
    }).catch(err => console.log('error seeding DB', err))
}

module.exports = seed