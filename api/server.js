const express = require('express');
const cors = require('cors');
const user = require('../data/helpers/userDb');
const post = require('../data/helpers/postDb');
const tag = require('../data/helpers/tagDb');

const server = express();

server.use(express.json());
server.use(cors());

// sanity check
server.get('/', (req, res) => {
  res.status(200).json({ api: 'server go run' });
});

// routes for users
server.get('/api/users', (req, res) => {
  user
    .get()
    .then(users => res.status(200).json(users))
    .catch(err =>
      res.status(404).json({ message: 'No users found.', error: err })
    );
});

// routes for posts
server.get('/api/posts', (req, res) => {
  post
    .get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: 'The post information could not be retrieved.',
        error: err
      });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  post
    .get(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'The post information could not be retrieved.',
        error: err
      });
    });
});

module.exports = server;
