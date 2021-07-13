import Book from "../models/Book.js";
import mongoose from "mongoose";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
    console.log(books);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getBookDetail = async (req, res) => {
  try {
    const book = await Book.find({ _id: req.params.id });
    res.status(200).json(book);
    console.log(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
