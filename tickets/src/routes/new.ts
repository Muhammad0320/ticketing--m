import express, { Request, Response } from "express";

import { requestValidator, requireAuth } from "@m0ticketing/common";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage(" Title is required "),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage(" Price should be greater than 0 "),
  ],

  requestValidator,

  async (req: Request, res: Response) => {
    res.sendStatus(201);
  }
);

export { router as createTicketRouter };
