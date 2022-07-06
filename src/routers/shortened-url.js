const express = require('express');
const router = express.Router();
const short = require('short-uuid');
const validator = require('validator');
const Url = require('../models/urlmodel');

const baseUrl = 'http:localhost:5000';

router.post('/links', async (req, res) => {
  let objectUrl = new Url(req.body);
  const url = JSON.stringify(objectUrl);

  try {
    const urlHash = short.generate();
    const shortUrl = baseUrl + '/' + urlHash;
    const generatedUrl = new Url({
      url: url,
      urlHash: urlHash,
      shortUrl: shortUrl,
    });
    await generatedUrl.save();
    res.status(200).send(generatedUrl);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
