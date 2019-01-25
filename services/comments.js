const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/blog');
const CommentService = {};

//CREATE POST
CommentService.create = (username, email, password) => {
    return db.none('INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${password})', { username, email, password });
}

//READ POST
CommentService.read = (id) => {
    return db.one('SELECT * FROM posts WHERE id=${id}', { id: id });
}

//READ POST COMMENTS
CommentService.readComments = (id) => {
    return db.any('SELECT comments.* FROM comments LEFT JOIN posts ON posts.id = comments.author WHERE posts.id = ${id}', { id: id });
}

//READ POST COMMENT
CommentService.readComment = (id, comment_id) => {
    return db.one('SELECT comments.* FROM comments LEFT JOIN posts ON posts.id = comments.author WHERE posts.id = ${id} AND comments.id = ${comment_id}', { id: id, comment_id: comment_id });
}


//UPDATE POST
CommentService.update = (id, name, email) => {
    return db.none('UPDATE users SET name = ${name}, email = ${email} WHERE id=${id}', { id, name, email });
 }

//DELETE POST
CommentService.delete = (id) => { 
    return db.none('DELETE FROM users WHERE id=${id}', {id});
}


module.exports = CommentService;