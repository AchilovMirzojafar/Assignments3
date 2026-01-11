const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    enum: ["Fiction", "Non-Fiction", "Sci-Fi", "Fantasy", "Biography", "Other"],
    required: true
  },
  publishedYear: {
    type: Number,
    min: 0,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Book", bookSchema);