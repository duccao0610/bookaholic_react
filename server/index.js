import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Book from "./models/Book.js";

const app = express();
app.use(cors());
app.use(express.json());

//Connect MongoDB
const CONNECTION_URL =
  "mongodb+srv://duccao0610:duccao0610@cluster0.0etmy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = 5000;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", true);

// const createBook = async (req, res) => {
//   const book = {
//     title: "Doraemon",
//     authors: ["Fujiko"],
//     categories: ["Comic", "Education"],
//     rating: 4,
//     cover:
//       "https://upload.wikimedia.org/wikipedia/vi/thumb/b/b7/Doraemon1.jpg/250px-Doraemon1.jpg",
//     description: "A comic about a robot cat come from the future",
//   };

//   const newBook = new Book(book);
//   try {
//     await newBook.save();
//   } catch (err) {
//     res.status(409).json({ message: err.message });
//   }
// };

// app.post("/book", createBook);

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
    console.log(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

app.get("/book", getBooks);
