import express, { Request, Response } from "express";

import { requestValidator, requireAuth } from "@m0ticketing/common";
import { body } from "express-validator";
import Tickets from "../model/tickets";
import { TicketCreatedPublisher } from "../events/publisher/TicketCreatedPublisher";
import { natsWrapper } from "../../natsWrapper";

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

    // console.log(natsWrapper.client);

    // await new TicketCreatedPublisher(natsWrapper.client).publish({
    //   id: ticket.id,
    //   title: ticket.title,
    //   price: ticket.price,
    //   userId: ticket.userId,
    // });

    res.status(201).json({
      status: "success",

      data: ticket,
    });
  }
);

export { router as createTicketRouter };
