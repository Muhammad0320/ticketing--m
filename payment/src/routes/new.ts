import { requireAuth } from "@m0ticketing/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  body("orderId")
    .not()
    .isEmpty()
    .isString()
    .withMessage("Please provide a valid userId"),
  body("token").not().isEmpty().withMessage("Please provide a valid token"),
  (req: Request, res: Response) => {}
);
