const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/blog');
const CommentService = {};

//CREATE COMMENT
CommentService.create = (author, post_id, title, body) => {
    return db.none('INSERT INTO comments (author, post_id, title, body) VALUES (${author}, ${post_id}, ${title}, ${body})', { author, post_id, title, body });
}

//READ COMMENT
CommentService.read = (id) => {
    return db.one('SELECT * FROM posts WHERE id=${id}', { id: id });
}

//UPDATE COMMENT
CommentService.update = (id, author, title, body) => {
    return db.none('UPDATE comments SET author = ${author}, title = ${title}, body = ${body} WHERE id=${id}', { id, author, title, body });
}

//DELETE COMMENT
CommentService.delete = (id) => {
    return db.none('DELETE FROM comments WHERE id=${id}', { id });
}


module.exports = CommentService;