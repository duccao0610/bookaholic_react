import express from "express";
import { getBooksByCategory, getOtherCategories } from "../controller/Books.js";

const router = express.Router();

router.get("/:category", getBooksByCategory, getOtherCategories);

export default router;
