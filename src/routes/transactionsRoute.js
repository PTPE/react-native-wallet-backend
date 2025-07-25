import express from "express";
import {
  createTransaction,
  deleteTransaction,
  getSummaryByUserId,
  getTransactionsByUserId,
} from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/:userId", getTransactionsByUserId);

router.get("/summary/:userId", getSummaryByUserId);

router.post("/", createTransaction);

router.delete("/:id", deleteTransaction);

export default router;
