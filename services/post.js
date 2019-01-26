const {db} = require ('../pgp');
const PostService = {};

//CREATE POST
PostService.create = (author, title, body) => {
    return db.none('INSERT INTO posts (author, title, body) VALUES (${author}, ${title}, ${body})', { author, title, body });
}

//READ POST
PostService.read = (id) => {
    return db.one('SELECT * FROM posts WHERE id=${id}', { id: id });
}

//READ POST COMMENTS
PostService.readComments = (id) => {
    return db.any('SELECT comments.* FROM comments LEFT JOIN posts ON posts.id = comments.author WHERE posts.id = ${id}', { id: id });
}

//READ POST COMMENT
PostService.readComment = (id, comment_id) => {
    return db.one('SELECT comments.* FROM comments LEFT JOIN posts ON posts.id = comments.author WHERE posts.id = ${id} AND comments.id = ${comment_id}', { id: id, comment_id: comment_id });
}

//GET AUTHOR
PostService.readAuthor = (id) => {
    return db.any ('SELECT author FROM posts WHERE id= ${id}', { id: id});
}

//UPDATE POST
PostService.update = (id, title, body) => {
    return db.none('UPDATE posts SET  title = ${title}, body = ${body} WHERE id=${id}', { id, title, body });
 }

//DELETE POST
PostService.delete = (id) => { 
    return db.none('DELETE FROM comments WHERE post_id=${id}; DELETE FROM posts WHERE id=${id}', {id});
}


module.exports = PostService;