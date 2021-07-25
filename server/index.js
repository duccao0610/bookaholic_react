const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookRoutes = require("./routes/Books.js");
const categoryRoutes = require("./routes/Categories.js");
const userRoutes = require("./routes/User.js");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/books", bookRoutes);
app.use("/categories", categoryRoutes);
app.use("/user", userRoutes);
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

const User = require("./models/User");
const bodyParser = require("body-parser");
const createUser = async (req, res) => {
  const newUser = new User({
    isAdmin: false,
    username: "hungngk98",
    password: "123456",
    nickname: "Nguyen Khac Hung",
    bio: "This is my bio to test.",
    address: { city: "Ha Noi", district: "Dong Da" },
    friends: [],
    shelves: [
      {
        shelfName: "Borrowing list",
        bookList: [
          "60e005890d078be795548f7e",
          "60e00a210d078be795548f80",
          "60e00ad80d078be795548f81",
        ],
      },
      {
        shelfName: "Lending list",
        bookList: [
          "60e00ddc0d078be795548f82",
          "60e00e590d078be795548f83",
          "60e00ff80d078be795548f84",
        ],
      },
    ],
    userRate: { downvote: 4, upvote: 185 },
    owning: [
      "60e00ddc0d078be795548f82",
      "60e00e590d078be795548f83",
      "60e00ff80d078be795548f84",
    ],
  });
  try {
    await newUser.save(() => {});
    res.json(newUser);
  } catch (err) {
    res.json({ msg: err.msg });
  }
};
app.post("/user/create", createUser);
