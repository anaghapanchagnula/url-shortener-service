const express = require('express');
const router = express.Router();
const Url = require('../models/urlmodel');

router.get('/:urlHash', async (req, res) => {
  const enteredUrl = await Url.findOneAndUpdate(
    {
      urlHash: req.params.urlHash,
    },
    { $inc: { clicks: 1 } }
  );

  try {
    await enteredUrl.save();
    res.set('Content-Type', 'application/json');
    res
      .status(302)
      .send(
        `Location: ${enteredUrl.url}\n Number of clicks: ${enteredUrl.clicks}`
      );
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
