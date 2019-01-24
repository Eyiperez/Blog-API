const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/blog');
const UserService = {};

//CREATE USER
UserService.create = (username, email, password) => {
    return db.none('INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})', { username, email, password });
}

//READ USER
UserService.read = (id) => {
    return db.one('SELECT username, email, id FROM users WHERE id=${id}', { id: id });
}

//READ USER POSTS
UserService.readPosts = (id) => {
    return db.any('SELECT posts.*, users.username FROM posts LEFT JOIN users ON users.id = posts.author WHERE users.id = ${id}', { id: id });
}

UserService.update = (id, name, email) => {
    return db.none('UPDATE users SET name = ${name}, email = ${email} WHERE id=${id}', { id, name, email });
 }

UserService.delete = (id) => { 
    return db.none('DELETE FROM users WHERE id=${id}', {id});
}

module.exports = UserService;