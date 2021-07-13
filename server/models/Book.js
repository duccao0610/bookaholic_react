import mongoose from "mongoose";

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

const Book = mongoose.model("Book", BookSchema);

export default Book;
