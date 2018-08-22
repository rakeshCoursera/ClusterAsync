const mongoose = require('mongoose');

const { Schema } = mongoose;

const Document = new Schema({
  data: {
    type: Object,
  },
});

module.exports = {
  Document: mongoose.model('document', Document),
};
