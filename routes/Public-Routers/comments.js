const express = require('express');
const commentRouter = express.Router();
const CommentService = require('../../services/comments');


// GET - READ COMMENT
commentRouter.get('/:comment_id', (req, res) => {
    const {comment_id} = req.params;
  
    CommentService.read(comment_id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err.toString());
      })
  });

  module.exports = commentRouter;