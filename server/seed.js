const sequelize = require('./database.js')

const seed = () => {
    sequelize.query(`
    DROP TABLE IF EXISTS user_fortunes;

    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS fortunes;
    
    create table users (
        user_id serial primary key, 
        username varchar(255) UNIQUE,  
        password varchar(255)
    );

    create table fortunes (
        fortune_id serial primary key,
        fortune varchar(255)
    );

    create table user_fortunes (
        user_id integer not null references users(user_id),
        fortune_id integer not null references fortunes(fortune_id)
    );

    insert into fortunes (fortune) 
    values ('You are gonna go far'), ('You got this'), ('Tomorrow is another day');
    `).then(() => {
        console.log('DB seeded!')
    }).catch(err => console.log('error seeding DB', err))
}
//const fortunes = [`You're gonna go far`, `You got this`, `Tomorrow is another day`]
module.exports = seed