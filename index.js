const express = require('express');
const cors = require('cors');
const { postDb, tagDb, userDb } = require('./data/helpers');

const server = express();
const port = 5000;

server.use(express.json());
server.use(cors());

server.get('/api/users/', (req, res) => {
	userDb.get()
		.then(users => res.status(200).send(users))
		.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
});

server.get('/api/users/:id', (req, res) => {
	const { id } = req.params;
	userDb.get(id)
		.then(user => {
			if (!user) {
				return res.status(404).json({ message: `The user with the ID ${ id } does not exist.` });
			}
			return res.status(200).send(user);
		})
		.catch(err => res.status(500).json({ error: 'The users information could not be retrieved.' }));
});

server.listen(port, () => {
	console.log(`\n=== Listening on port ${ port } ===`)
});
