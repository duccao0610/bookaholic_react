import mongoose from "mongoose";

const BookSchema = mongoose.Schema({
  title: String,
  authors: [String],
  categories: [String],
  rating: {
    type: Number,
    default: 0,
  },
  cover: String,
  description: String,
});

const Book = mongoose.model("Book", BookSchema);

export default Book;
