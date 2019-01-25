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

//READ USER POST
UserService.readPost = (id, post_id) => {
    return db.one('SELECT posts.*, users.username FROM posts LEFT JOIN users ON users.id = posts.author WHERE users.id = ${id} AND posts.id = ${post_id}', { id: id, post_id: post_id });
}

//READ USER COMMENTS
UserService.readComments = (id) => {
    return db.any('SELECT comments.*, users.username FROM comments LEFT JOIN users ON users.id = comments.author WHERE users.id = ${id}', { id: id });
}

//READ USER COMMENT
UserService.readPost = (id, comment_id) => {
    return db.one('SELECT comments.*, users.username FROM comments LEFT JOIN users ON users.id = comments.author WHERE users.id = ${id} AND comments.id = ${comment_id}', { id: id, comment_id: comment_id });
}

UserService.update = (id, name, email) => {
    return db.none('UPDATE users SET name = ${name}, email = ${email} WHERE id=${id}', { id, name, email });
 }

UserService.delete = (id) => { 
    return db.none('DELETE FROM users WHERE id=${id}', {id});
}

module.exports = UserService;