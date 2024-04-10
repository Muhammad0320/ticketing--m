import express, { Request, Response } from "express";
import Orders from "../model/orders";
import { NotFound, requireAuth, NotAuthorized } from "@m0ticketing/common";

const router = express.Router();

router.get("/:orderId", requireAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Orders.findById(orderId);

  if (!order) {
    throw new NotFound();
  }

  console.log(order);

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorized();
  }

  res.status(200).json({ status: "success", data: order });
});

export { router as showOrderRouter };
