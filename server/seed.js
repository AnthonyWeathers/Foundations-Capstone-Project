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
    values ('You are gonna go far'), ('You got this'), ('Tomorrow is another day'), ('Believe you can and you’re halfway there'), ('Don’t count the days, make the days count'), ('If you’re having fun, that’s when the best memories are built'), ('You just gotta keep going and fighting for everything, and one day you’ll get to where you want'), ('It is often the small steps, not the giant leaps, that bring about the most lasting change'), ('There is always light. If only we’re brave enough to see it. If only we’re brave enough to be it');
    `).then(() => {
        console.log('DB seeded!')
    }).catch(err => console.log('error seeding DB', err))
}
//const fortunes = [`You're gonna go far`, `You got this`, `Tomorrow is another day`]
module.exports = seed