const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Log = require('../database/log');

router.post('/', async (req, res, next) => {
  try {
    const newLog = new Log(req.body)
    await newLog.save();
    res.send("Log created");
  } catch (error) {
      res.status(500).send({
        upload_error: 'Error while uploading log information...Try again later.'
      });
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send({
        upload_error: error.message
      });
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const logs = await Log.find({});
    res.send(logs);
  } catch (error) {
    res.status(500).send({ get_error: 'Error while getting list of logs.' })
  }
});

module.exports = router;