const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socialmedia');

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  email: String,
  password: String,
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

module.exports = mongoose.model('User', userSchema);
