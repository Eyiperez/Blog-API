const express = require('express');
const commentRouter = express.Router();
const CommentService = require('../../services/comments');

//POST - CREATE COMMENT
commentRouter.post('/', (req,res) => {
  const {author, post_id, title, body} = req.body;

  CommentService.create(author, post_id, title, body)
  .then(() =>{
      console.log({success: 'comment added'});
      res.json({success: 'comment added'});
  })
  .catch(err => {
      res.json(err.toString());
    })
});

// PUT - UPDATE COMMENT
commentRouter.put('/:id', (req,res) => {
    const { title, body} = req.body;
    const {id } = req.params
    CommentService.update(id, title, body)
    .then(() =>{
        console.log({success: 'comment updated'});
        res.json({success: 'comment updated'});
    })
    .catch(err => {
        res.json(err.toString());
      })
  });
  
  // DELETE - DELETE COMMENT
  commentRouter.delete('/:id', (req, res) => {
    const {id} = req.params;
  
    CommentService.delete(id)
    .then(() => {
      res.json({ success: `comment with ID: ${id} deleted.`});
    })
    .catch(err => {
      res.json(err.toString());
    })
  });
  
    module.exports = commentRouter;