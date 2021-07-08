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
