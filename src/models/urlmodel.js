const mongoose = require('mongoose');
const validator = require('validator');

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  urlHash: {
    type: String,
  },
  shortUrl: {
    type: String,
  },
});

urlSchema.methods.toJSON = function () {
  const url = this;
  const urlObject = url.toObject();

  delete urlObject._id;
  delete urlObject.__v;

  return urlObject;
};

const Url = mongoose.model('Url', urlSchema);
module.exports = Url;
