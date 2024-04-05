import {
  NotAuthorized,
  NotFound,
  requestValidator,
  requireAuth,
} from "@m0ticketing/common";
import express, { Request, Response } from "express";
import Tickets from "../model/tickets";
import { body } from "express-validator";

const router = express.Router();

router.put(
  "/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("This field is provided"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Please provide a valid price"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const ticket = await Tickets.findById(req.params.id);

    if (!ticket) {
      throw new NotFound();
    }

    if (req.currentUser.id !== ticket.userId) {
      throw new NotAuthorized();
    }

    ticket.set({ title: req.body.title, price: req.body.price });

    await ticket.save();

    res.status(200).json({ status: "success", data: ticket });
  }
);

export { router as updateTicketRouter };
