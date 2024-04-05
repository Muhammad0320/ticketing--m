import express from "express";
import Tickets from "../model/tickets";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const ticket = await Tickets.find({});

  res.status(200).json({
    status: "success",
    data: ticket,
  });
});

export { router as ticketIndexRouter };
