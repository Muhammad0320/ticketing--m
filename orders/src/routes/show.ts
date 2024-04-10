import express, { Request, Response } from "express";
import Orders from "../model/orders";
import { NotFound, BadRequestError } from "@m0ticketing/common";

const router = express.Router();

router.get("/:orderId", async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Orders.findById(orderId);

  if (!order) {
    throw new NotFound();
  }

  if (order.userId !== req.currentUser!.id) {
    throw new BadRequestError(" Not Authorized! ");
  }

  res.status(200).json({ status: "success", data: order });
});

export { router as showOrderRouter };
