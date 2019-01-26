const {db} = require ('../pgp');
const UserService = {};

//CREATE USER
UserService.create = (username, email, password) => {
    return db.none('INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})', { username, email, password });
}

//USER CHECK FOR LOGIN
UserService.userCheck = (username) => {
    return db.one('SELECT password FROM users WHERE username = ${username}', { username: username });
}

//ADD TOKEN TO USER AFTER LOGIN
UserService.addToken = (username, token) => {
    return db.none('UPDATE users SET token = ${token} WHERE username=${username}', { username, token });
}

//READ TOKEN
UserService.readToken = (id) => {
    return db.any('SELECT token FROM users WHERE id=${id}', { id: id });
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

//UPDATE USER
UserService.update = (id, username, email, password) => {
    return db.none('UPDATE users SET username = ${username}, email = ${email}, password = ${password} WHERE id=${id}', { id, username, email, password });
}

//DELETE USER
UserService.delete = (id) => {
    return db.none('DELETE FROM users WHERE id=${id}', { id: id });
}

module.exports = UserService;