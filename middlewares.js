
const checkForToken = (req, res, next) => {
    const authTokenInput = req.headers
    const user = req.body.username
    userfs.readUser(user)
        .then((data) => {
            const userOBj = JSON.parse(data)
            if (userOBj.token === authTokenInput) {
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