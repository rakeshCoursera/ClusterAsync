const express = require('express');

const { Document } = require('../models/documentSchema');

const router = express.Router();

const insertToDB = (model, data) => {
  model.create({ data }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

/* GET home page. */
router.get('/', (req, res) => {
  res.send({ title: 'Route Alive' });
});

/* POST new doc. */
router.post('/doc/new', (req, res) => {
  insertToDB(Document, req.body);
  res.send({});
});

module.exports = router;
