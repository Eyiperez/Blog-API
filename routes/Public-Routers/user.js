const express = require('express');
const crypto = require("crypto");
const userRouter = express.Router();
const UserService = require('../../services/user');

// POST - CREATE USER
userRouter.post('/', (req, res) => {
  const { username, email, password } = req.body;

  UserService.create(username, email, password)
    .then(() => {
      console.log({ success: 'user added' });
      res.json({ success: 'user added' });
    })
    .catch(err => {
      res.json(err.toString());
    })
});

//POST - LOGIN
userRouter.post('/login', (req, res) => {
  const { username, password } = req.body;

  UserService.userCheck(username)
    .then((data) => {
      console.log(data);
      if (data.password === password) {
        const token = crypto.randomBytes(8).toString("hex");
        console.log(token);
        res.json({ status: "logged in", token: token })
        return UserService.addToken(username, token)
      }
      else {
        throw new Error("password does not match")
      }
    })
    .catch(err => {
      res.json(err.toString());
    })
});

// GET - READ USER
userRouter.get('/:user_id', (req, res) => {
  const { user_id } = req.params;

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
  const { user_id } = req.params;

  UserService.readPosts(user_id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err.toString());
    })
});

// GET - READ USER POST
userRouter.get('/:user_id/posts/:post_id', (req, res) => {
  const { user_id, post_id } = req.params;

  UserService.readPost(user_id, post_id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err.toString());
    })
});


// GET - READ USER COMMENTS
userRouter.get('/:user_id/comments', (req, res) => {
  const { user_id } = req.params;

  UserService.readComments(user_id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err.toString());
    })
});

// GET - READ USER COMMENT
userRouter.get('/:user_id/comments/:comment_id', (req, res) => {
  const { user_id, comment_id } = req.params;

  UserService.readPost(user_id, comment_id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err.toString());
    })
});

module.exports = userRouter;