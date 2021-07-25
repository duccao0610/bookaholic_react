const Book = require("../models/Book.js");

const getBooksTrending = async (req, res) => {
  try {
    const books = await Book.find().limit(10);
    res.status(200).json(books);
    // console.log(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getBookDetail = async (req, res) => {
  try {
    const book = await Book.find({ _id: req.params.id });
    const relatedCategories = await Book.aggregate([
      { $unwind: { path: "$categories" } },
      {
        $group: {
          _id: "$categories",
          total: {
            $sum: 1,
          },
        },
      },
      { $match: { _id: { $in: book[0].categories } } },
      { $sort: { total: -1 } },
    ]);
    const relatedBooks = await Book.find({
      categories: { $in: book[0].categories },
      _id: { $ne: book[0]._id },
    }).limit(10);

    const bookInfo = {
      info: book,
      relatedGenres: relatedCategories,
      relatedBooks: relatedBooks,
    };
    res.status(200).json(bookInfo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getBookByCategory = async (req, res) => {
  try {
    const books = await Book.find({ categories: req.params.category });
    res.status(200).json(books);
    console(`${req.params.category}`, books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getBooksBySearch = async (req, res) => {
  try {
    const regPattern = new RegExp(`${req.params.searchValue}`, "i");
    const books = await Book.find({
      title: {
        $regex: regPattern,
      },
    }).limit(10);
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getBookByCategory,
  getBookDetail,
  getBooksBySearch,
  getBooksTrending,
};
