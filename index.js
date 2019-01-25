const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;


const publicUserRouter = require('./routes/public-routers/user')
const publicPostRouter = require('./routes/public-routers/post')
const publicCommentsRouter = require('./routes/public-routers/comments')

const privateUserRouter = require('./routes/private-routers/user')
const privatePostRouter = require('./routes/private-routers/post')
const privateCommentsRouter = require('./routes/private-routers/comments')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())


app.use('/user', publicUserRouter);

app.use('/post', publicPostRouter);

app.use('/comment', publicCommentsRouter);

//app.use(authentication);

app.use('/user', privateUserRouter);

// app.use('/post', privatePostRouter);

// app.use('/comment', privateCommentsRouter);


app.listen(port, () =>{
    console.log('Blog-API is running on port: ' +port);
})