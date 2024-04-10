import {
  NotAuthorized,
  NotFound,
  OrderStatus,
  requireAuth,
} from "@m0ticketing/common";
import express, { Request, Response } from "express";
import Orders from "../model/orders";
import mongoose from "mongoose";

const router = express.Router();

router.delete("/:orderId", requireAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Orders.findById(orderId).populate("ticket");

  if (!order) {
    throw new NotFound();
  }

  if (!new mongoose.Types.ObjectId(req.currentUser.id).equals(order.userId)) {
    throw new NotAuthorized();
  }

  order.status = OrderStatus.Cancelled;

  res.status(204).json({ status: "success" });
});

export { router as deleteOrderRouter };
