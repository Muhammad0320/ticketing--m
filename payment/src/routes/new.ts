import {
  BadRequestError,
  NotAuthorized,
  NotFound,
  OrderStatus,
  requestValidator,
  requireAuth,
} from "@m0ticketing/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Orders } from "../model/order";
import { stripe } from "../stripe";

const router = express.Router();

router.post(
  "/",
  requireAuth,
  [
    body("orderId")
      .not()
      .isEmpty()
      .withMessage("Please provide a valid userId"),
    body("token").not().isEmpty().withMessage("Please provide a valid token"),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Orders.findById(orderId);

    if (!order) {
      return new NotFound();
    }

    if (order.userId !== req.currentUser!.id) {
      return new NotAuthorized();
    }

    if (order.status === OrderStatus.Cancelled) {
      return new BadRequestError("This order is cancelled");
    }

    await stripe.charges.create({
      amount: order.price * 100,
      currency: "usd",
      source: token,
    });

    res.sendStatus(200);
  }
);

export { router as createCharegeRouter };
