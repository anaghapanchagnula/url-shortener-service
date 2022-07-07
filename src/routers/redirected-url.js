const express = require('express');
const router = express.Router();
const Url = require('../models/urlmodel');

router.get('/:urlHash', async (req, res) => {
  const storedUrlsArray = await Url.find({});
  const enteredUrl = await Url.findOne({ urlHash: req.params.urlHash });

  try {
    storedUrlsArray.forEach((url) => {
      if (enteredUrl.url === url.url) {
        enteredUrl.clicks++;
        enteredUrl.save();
        res.set('Content-Type', 'application/json');
        res
          .status(302)
          .send(
            `Location: ${enteredUrl.url}\n Number of clicks: ${enteredUrl.clicks}`
          );
      }
    });
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
