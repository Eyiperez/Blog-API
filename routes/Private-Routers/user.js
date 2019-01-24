const express = require('express');
const userRouter = express.Router();
const UserService = require('../../services/user');


// PUT - UPDATE USER
userRouter.put('/:id', (req,res) => {
    const { name, email} = req.body;
    const {id } = req.params
    UserService.update(id, name, email)
    .then(() =>{
        console.log({success: 'user updated'});
        res.json({success: 'user updated'});
    })
    .catch(err => {
        res.json(err.toString());
      })
});

// DELETE - DELETE USER
userRouter.delete('/:id');


module.exports = userRouter;