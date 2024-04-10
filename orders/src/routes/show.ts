import express, { Request, Response } from "express";
import Orders from "../model/orders";
import { NotFound } from "@m0ticketing/common";

const router = express.Router();

router.get("/:orderId", async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Orders.findById(orderId);

  if (!order) {
    throw new NotFound();
  }
});

export { router as showOrderRouter };
