const express = require('express');
const router = express.Router();
const short = require('short-uuid');
const validator = require('validator');
const Url = require('../models/urlmodel');

const configDomain = 'http:localhost:5000';

router.post('/links', async (req, res) => {
  try {
    const urlHash = short.generate();
    const shortUrl = configDomain + '/' + urlHash;
    const generatedUrl = new Url({
      url: req.body.url,
      urlHash: urlHash,
      shortUrl: shortUrl,
    });
    await generatedUrl.save();
    res.status(200).send(generatedUrl);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/links', async (req, res) => {
  Url.find({})
    .then((urls) => {
      res.send(urls);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.patch('/:urlHash', async (req, res) => {
  const objectArray = Object.keys(req.body);
  try {
    const url = await Url.findOne({
      urlHash: req.params.urlHash,
    });

    if (url) {
      objectArray.forEach((update) => {
        url[update] = req.body[update];
      });
      await url.save();
      res.send(url);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete('/:urlHash', async (req, res) => {
  try {
    const url = await Url.findOneAndDelete({
      urlHash: req.params.urlHash,
    });

    if (url) {
      return res.status(200).send('Url deleted');
    } else {
      return res.status(404).send('Url not found.');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
