const express = require('express');
const db = require('../data/helpers/userDb');
const router = express.Router();

function nameUppercaser(req, res, next) {
  if (req.body.name) {
    req.body.name = req.body.name.toUpperCase();
  }
  next();
}

router
  .route('/')
  .get(async (req, res) => {
    try {
      let data = await db.get();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  .post(nameUppercaser, async (req, res) => {
    if (!req.body.name)
      res.status(400).json({ message: 'You need to provide a name!' });
    try {
      let data = await db.insert({ name: req.body.name });
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
