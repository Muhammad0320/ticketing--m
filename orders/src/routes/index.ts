import { requireAuth } from "@m0ticketing/common";
import express, { Request, Response } from "express";
import Orders from "../model/orders";

const router = express.Router();

router.get("/", requireAuth, async (req: Request, res: Response) => {
  const orders = await Orders.find({ userId: req.currentUser?.id }).populate(
    "ticket"
  );

  res.status(200).json({ status: "success", data: orders });
});

export { router as indexOrderRouter };

