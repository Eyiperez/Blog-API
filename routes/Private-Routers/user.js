const express = require('express');
const userRouter = express.Router();
const UserService = require('../../services/user');


// PUT - UPDATE USER
userRouter.put('/:user_id', (req,res) => {
    const { username, email, password} = req.body;
    const { user_id } = req.params
    UserService.update(user_id, username, email, password)
    .then(() =>{
        console.log({success: 'user updated'});
        res.json({success: 'user updated'});
    })
    .catch(err => {
        res.json(err.toString());
      })
});

// DELETE - DELETE USER
userRouter.delete('/:user_id', (req, res) => {
    const {user_id} = req.params;

  UserService.delete(user_id)
    .then(() => {
      res.json({ success: `User with ID: ${user_id} deleted.`});
    })
    .catch(err => {
      res.json(err.toString());
    })
});


module.exports = userRouter;