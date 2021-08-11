const Book = require("../models/Book.js");
const ObjectId = require("mongoose").Types.ObjectId;

const getBooksTrending = async (req, res) => {
  try {
    const books = await Book.aggregate([
      {
        $match: {
          $expr: { $lt: [0.5, { $rand: {} }] },
          $expr: { $lt: [0, "$averageRating"] },
        },
      },
      // "title cover categories averageRating authors"
      {
        $project: {
          title: 1,
          cover: 1,
          categories: 1,
          averageRating: 1,
          authors: 1,
        },
      },
      {
        $sort: {
          averageRating: -1,
        },
      },
    ]);

    res.status(200).json({ books: books, message: true });
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
      $or: [
        { title: { $regex: book[0].title.split(" ")[0] } },
        { categories: { $in: book[0].categories } },
      ],
      _id: { $ne: book[0]._id },
      $expr: { $lt: [0.5, { $rand: {} }] },
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

const getBooksByCategory = async (req, res, next) => {
  try {
    const books = await Book.find({ categories: req.params.category }).limit(
      12
    );
    res.locals.books = books;
    next();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getMoreBooksByCategory = async (req, res) => {
  try {
    const books = await Book.find({ categories: req.params.category })
      .skip(Number(req.params.skip))
      .limit(12);
    res.json(books);
  } catch (err) {
    console.log(err);
  }
};

const getBooksBySearch = async (req, res) => {
  try {
    const regPattern = new RegExp(`${req.params.searchValue}`, "i");
    const books = await Book.find({
      $or: [
        {
          title: {
            $regex: regPattern,
          },
        },
        {
          authors: {
            $regex: regPattern,
          },
        },
      ],
    }).limit(10);
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getOtherCategories = async (req, res) => {
  try {
    const otherCategories = await Book.aggregate([
      {
        $unwind: { path: "$categories" },
      },
      {
        $group: {
          _id: "$categories",
          total: {
            $sum: 1,
          },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 8 },
    ]);

    const books = res.locals.books;
    const categoryData = {
      books: books,
      otherCategories: otherCategories,
    };

    res.status(200).json(categoryData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateAverageRatingById = async (bookId, average) => {
  try {
    await Book.updateOne(
      {
        _id: ObjectId(bookId),
      },
      {
        $set: {
          averageRating: average,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getBooksByCategory,
  getBookDetail,
  getBooksBySearch,
  getBooksTrending,
  getOtherCategories,
  updateAverageRatingById,
  getMoreBooksByCategory,
};
