const express = require('express');
const postRouter = express.Router();
const PostService = require('../../services/post');

//POST - CREATE POST
postRouter.post('/', (req,res) => {
    const {author, title, body} = req.body;

    PostService.create(author, title, body)
    .then(() =>{
        console.log({success: 'post added'});
        res.json({success: 'post added'});
    })
    .catch(err => {
        res.json(err.toString());
      })
});

// PUT - UPDATE USER
postRouter.put('/:id', (req,res) => {
    const { title, body} = req.body;
    const {id } = req.params
    PostService.update(id, title, body)
    .then(() =>{
        console.log({success: 'post updated'});
        res.json({success: 'post updated'});
    })
    .catch(err => {
        res.json(err.toString());
      })
});

// DELETE - DELETE USER
postRouter.delete('/:id', (req, res) => {
    const {id} = req.params;

  PostService.delete(id)
    .then(() => {
      res.json({ success: `Post with ID: ${id} deleted.`});
    })
    .catch(err => {
      res.json(err.toString());
    })
});


module.exports = postRouter;
