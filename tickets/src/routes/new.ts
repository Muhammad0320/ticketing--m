import express, { Request, Response } from "express";

import { requestValidator, requireAuth } from "@m0ticketing/common";
import { body } from "express-validator";
import Tickets from "../model/tickets";

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
    const { title, price }: { title: string; price: number } = req.body;

    const ticket = await Tickets.buildTicket({
      title,
      price,
      userId: req.currentUser!.id,
    });

    res.status(201).json({
      status: "success",

      data: ticket,
    });
  }
);

export { router as createTicketRouter };
