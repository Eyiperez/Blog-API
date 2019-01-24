const express = require('express');
const userRouter = express.Router();
const UserService = require('../../services/user');

// POST - CREATE USER
userRouter.post('/', (req,res) => {
    const {username, email, password} = req.body;

    UserService.create(username, email, password)
    .then(() =>{
        console.log({success: 'user added'});
        res.json({success: 'user added'});
    })
    .catch(err => {
        res.json(err.toString());
      })
});

// GET - READ USER
userRouter.get('/:user_id', (req, res) => {
  const {user_id} = req.params;

  UserService.read(user_id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err.toString());
    })
});

// GET - READ USER POSTS
userRouter.get('/:user_id/posts', (req, res) => {
    const {user_id} = req.params;
  
    UserService.readPosts(user_id)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err.toString());
      })
  });



module.exports = userRouter;