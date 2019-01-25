const express = require('express');
const userRouter = express.Router();
const UserService = require('../../services/user');


// PUT - UPDATE USER
userRouter.put('/:id', (req,res) => {
    const { username, email, password} = req.body;
    const {id } = req.params
    UserService.update(id, username, email, password)
    .then(() =>{
        console.log({success: 'user updated'});
        res.json({success: 'user updated'});
    })
    .catch(err => {
        res.json(err.toString());
      })
});

// DELETE - DELETE USER
userRouter.delete('/:id', (req, res) => {
    const {id} = req.params;

  UserService.delete(id)
    .then(() => {
      res.json({ success: `Pet with ID: ${id} deleted.`});
    })
    .catch(err => {
      res.json(err.toString());
    })
});


module.exports = userRouter;