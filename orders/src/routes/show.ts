import express, { Request, Response } from "express";
import Orders from "../model/orders";
import { NotFound, requireAuth, NotAuthorized } from "@m0ticketing/common";
import mongoose from "mongoose";

const router = express.Router();

router.get("/:orderId", requireAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Orders.findById(orderId).populate("ticket");

  if (!order) {
    throw new NotFound();
  }

  if (!new mongoose.Types.ObjectId(req.currentUser.id).equals(order.userId)) {
    throw new NotAuthorized();
  }

  res.status(200).json({ status: "success", data: order });
});

export { router as showOrderRouter };
