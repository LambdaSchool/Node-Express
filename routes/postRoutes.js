const express = require('express');

const postDb = require('../data/helpers/postDb');
const tagRoutes = require('./tagRoutes');

const router = express.Router();

router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    postDb
        .get(id)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {
    const postInfo = req.body;

    postDb
        .insert(postInfo)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const update = req.body;

    postDb
        .udpate(id, update)
        .then(posts => {
            postDb
                .get(id)
                .then(posts => {
                    res.json(posts);
                })
                .catch(err => {
                    res.status(500).json({ error: err });
                });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    postDb
        .remove(id)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.get('/:id/tags', (req, res, nest) => {
    const { id } = req.params;

    postDb
        .getPostTags(id)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
})

module.exports = router;