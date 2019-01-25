const express = require('express');
const postRouter = express.Router();
const PostService = require('../../services/post');


// GET - READ POST
postRouter.get('/:post_id', (req, res) => {
    const {post_id} = req.params;
  
    PostService.read(post_id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err.toString());
      })
  });

  // GET - READ POST COMMENTS
postRouter.get('/:post_id/comments', (req, res) => {
    const {post_id} = req.params;
  
    PostService.readComments(post_id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err.toString());
      })
  });

// GET - READ POST COMMENT
postRouter.get('/:post_id/comments/:comment_id', (req, res) => {
    const {post_id, comment_id} = req.params;
  
    PostService.readComment(post_id, comment_id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err.toString());
      })
  });


module.exports = postRouter;