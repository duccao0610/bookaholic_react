import express from "express";
import { getBooks, getBookDetail } from "../controller/Books.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookDetail);
export default router;
