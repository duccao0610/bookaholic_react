const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: String,
  authors: [String],
  categories: [String],
  averageRating: {
    type: Number,
    default: 0,
  },
  reviews: [String],
  owners: [String],
  cover: String,
  description: String,
});

class BookClass {
  getTitle() {
    return `${this.title}`;
  }
  calculateAverageRating() {}
}

BookSchema.loadClass(BookClass);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
