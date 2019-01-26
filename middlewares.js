const UserService = require('./services/user');

const checkForUserToken = (req, res, next) => {
    const authTokenInput = req.headers.token
    console.log(authTokenInput);
    console.log(req.body)
    const bodyObj = req.body
    const pathArr = req.path.split('/');
    console.log(pathArr)
    console.log(req.path)
    let user_id = 0
    if (bodyObj.author !== null) {
        user_id = req.body.author
    } if (pathArr[1] === 'user') {
        
        user_id = pathArr[pathArr.length - 1]
    }
    console.log(user_id)
    UserService.readToken(user_id)
        .then((data) => {
            console.log(data)
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

// const checkForUserToken = (req, res, next) => {
//     const authTokenInput = req.headers.token
//     console.log(authTokenInput);
//     console.log(req.path)
//     const pathArr = req.path.split('/');
// const user_id = pathArr[pathArr.length -1]
//     console.log(user_id)
//     UserService.readToken(user_id)
//         .then((data) => {
//             console.log(data)
//             if (data[0].token === authTokenInput) {
//                 next()

//             } else {
//                 throw new Error('not logged in')
//             }

//         })
//         .catch(e => {
//             res.status(400)
//             res.json({
//                 "err": e.toString(),
//             })
//         })
// }

module.exports = {
    checkForUserToken,
    //checkForToken,
}