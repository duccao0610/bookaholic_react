import express from "express";
import { getBooks } from "../controller/Books.js";

const router = express.Router();

router.get("/", getBooks);

export default router;
