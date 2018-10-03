const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { postDb, tagDb, userDb } = require('./data/helpers');

const server = express();
const port = 5000;

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('tiny'));

const yell = (req, res, next) => {
	req.yelledUser = { ...req.body};
	req.yelledUser.name = req.yelledUser.name.toUpperCase();
	next();
};

server.get('/api/users', (req, res) => {
	userDb.get()
		.then(users => res.status(200).json(users))
		.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
});

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	userDb.get(id)
		.then(user => {
			if (!user) {
				return res.status(404).json({ error: `The user with the ID ${ id } does not exist.` });
			}
			return res.status(200).json(user);
		})
		.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
});

server.get('/api/users/:id/posts', (req, res) => {
	const { id } = req.params;
	userDb.getUserPosts(parseInt(id))
		.then(posts => {
			if (!posts.length) {
				return res.status(404).json({ error: `The user with the ID ${ id } does not exist.` });
			}
			return res.status(200).json(posts);
		})
		.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
});

server.post('/api/users', yell, (req, res) => {
	const newUser = req.yelledUser;
	userDb.insert(newUser)
		.then(id => {
			const newId = id.id;
			return userDb.get(newId)
				.then(user => {
					if (!user) {
						return res.status(404).json({ error: `The newly created user with the ID ${ newId } could not be retrieved.` });
					}
					return res.status(201).json(user);
				})
				.catch(err => res.status(500).json({ error: 'The newly created user\'s information could not be retrieved.' }));
		})
		.catch(err => res.status(500).json({ error: 'There was an error while saving the user to the database' }));
});

server.put('/api/users/:id', yell, (req, res) => {
	const { id } = req.params;
	const updatedUser = req.yelledUser;
	userDb.update(parseInt(id), updatedUser)
		.then(user => {
			if (!user) {
				return res.status(404).json({ error: `The user with the ID ${ id } does not exist.` });
			}
			return userDb.get(id)
				.then(user => {
					if (!user) {
						return res.status(404).json({ error: `The newly updated user with the ID ${ id } could not be retrieved.` });
					}
					return res.status(200).json(user);
				})
				.catch(err => res.status(500).json({ error: 'The newly updated user\'s information could not be retrieved.' }));
		})
		.catch(err => res.status(500).json({ error: 'There was an error while updating the user information in the database' }));
});

server.listen(port, () => {
	console.log(`\n=== Listening on port ${ port } ===`);
});
