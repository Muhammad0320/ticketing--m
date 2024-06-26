import {
  BadRequestError,
  NotFound,
  requestValidator,
  requireAuth,
} from "@m0ticketing/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import Ticket from "../model/tickets";
import Orders, { OrderStatus } from "../model/orders";
import { OrderCreatedPublisher } from "../events/publisher/OrderCreatedPublisher";
import { natsWrapper } from "../natsWrapper";

const router = express.Router();

const EXPIRATION_WINDOWS_SECONDS = 15 * 60;

router.post(
  "/",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("Please provide a valid ticketId"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFound();
    }

    const isReserved = await ticket.isReserved();

    if (isReserved) {
      throw new BadRequestError("This ticket is reserved");
    }

    const expiration = new Date();

    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOWS_SECONDS);

    const order = await Orders.buildOrder({
      ticket,
      userId: req.currentUser!.id,

      status: OrderStatus.Created,
      expiresAt: expiration,
    });

    await new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      ticket: {
        id: order.ticket.id,
        price: order.ticket.price,
      },
    });

    res.status(201).json({ status: "success", data: order });
  }
);

export { router as newOrderRouter };
