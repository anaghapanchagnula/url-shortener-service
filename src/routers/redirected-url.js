const express = require('express');
const router = express.Router();
const Url = require('../models/urlmodel');

router.get('/:urlHash', async (req, res) => {
  try {
    const url = await Url.findOne({
      urlHash: req.params.urlHash,
    });
    res.status(302).send(`Location: ${url.url}`);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;