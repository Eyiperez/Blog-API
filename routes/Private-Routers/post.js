// POST - CREATE POST
// postRouter.post('/', (req,res) => {
//     const {username, email, password} = req.body;

//     PostService.create(username, email, password)
//     .then(() =>{
//         console.log({success: 'user added'});
//         res.json({success: 'user added'});
//     })
//     .catch(err => {
//         res.json(err.toString());
//       })
// });