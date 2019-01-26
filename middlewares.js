const UserService = require('./services/user');
const PostService = require('./services/post');
const CommentService = require('./services/comments');


const checkForToken = (req, res, next) => {
    const authTokenInput = req.headers.token
    const bodyObj = req.body
    const pathArr = req.path.split('/');
    let user_id = 0
    if (pathArr[1] === 'post') {
        const post_id = pathArr[pathArr.length - 1]
        return PostService.readAuthor(post_id)
            .then((data) => {
                
                console.log(data)
                const userid = data[0].author
                console.log(userid)
                return UserService.readToken(userid)
            })
            .then((data) => {
                if (data[0].token === authTokenInput) {
                    next()

                } else {
                    throw new Error('not logged in')
                }
            })
            .catch(e => {
                res.status(400)
                res.json({
                    "err": e.toString(),
                })
            })
    }
    else if (bodyObj.author !== null) {
        user_id = req.body.author
    } if (pathArr[1] === 'user') {
        user_id = pathArr[pathArr.length - 1]
    } 
    console.log(user_id)
    UserService.readToken(user_id)
        .then((data) => {
            if (data[0].token === authTokenInput) {
                next()

            } else {
                throw new Error('not logged in')
            }
        })
        .catch(e => {
            res.status(400)
            res.json({
                "err": e.toString(),
            })
        })
    
    
    
}



module.exports = {
    checkForToken,

}