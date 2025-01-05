const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  releaseDate: { type: Date },
  genre: { type: String },
});

module.exports = mongoose.model('Movie', movieSchema);
