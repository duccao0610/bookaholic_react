import express from "express";
import {
  getBooksTrending,
  getBookDetail,
  getBooksBySearch,
} from "../controller/Books.js";

const router = express.Router();

router.get("/", getBooksTrending);
router.get("/:id", getBookDetail);
router.get("/search/:searchValue", getBooksBySearch);

export default router;
