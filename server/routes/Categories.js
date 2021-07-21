import express from "express";
import { getBookByCategory } from "../controller/Books.js";

const router = express.Router();

router.get("/:category", getBookByCategory);

export default router;
