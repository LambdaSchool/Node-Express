// Import Node Modules
const express = require('express');
const postDb = require('./data/helpers/postDb');
const userDb = require('./data/helpers/userDb');

const helmet = require('helmet')
const logger = require('morgan')
const server = express();
const PORT = 4400;

const userRouter = require('./routers/user_router');


server.use(
    express.json(),
    helmet(),
    logger('tiny'),
    );

server.use('/users', userRouter);

// Server calls
//  server.get('/', (req, res) => res.json({message: "hello!"}))

// Users section

//  server.get('/users', (req, res) => {
//      userDb.get()
//         .then(users => res.json(users))
//         .catch(err =>
//         res.status(500)
//         .json({error: "The users info could not be retrieved."}))
//  })

//  server.get('/users/:id', (req, res) => {
//      const {id} = req.params
//      userDb.get(id)
//         .then((user) => {
//             if (user) {
//                 res.json(user);
//             } else {
//                 res.status(400)
//                 .json({message: "The user with this id does not exist."})
//             }
//             res.json(user);
//         })
//         .catch(err =>
//             res.status(500)
//             .json({ error: "The user info could not be retrieved."})
//             )
//  })

//  Post section
 server.get('/posts', (req, res) => {
    postDb.get()
        .then(posts => res.json(posts))
        .catch(err => 
        res.status(500)
        .json({error: "The posts information could not be retrieved."})
        )
})

server.get('/posts/:id', (req, res) => {
    const {id} = req.params
    postDb.get(id)
       .then((post) => {
           if (post) {
               res.json(post);
           } else {
               res.status(400)
               .json({message: "The post with this id does not exist."})
           }
           res.json(post);
       })
       .catch(err =>
           res.status(500)
           .json({ error: "The user info could not be retrieved."})
           )
})
// Listening
server.listen(PORT, () => {
    console.log(`Server is running and listening to ${PORT}`);
})