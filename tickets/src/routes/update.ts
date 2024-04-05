import { NotFound, requireAuth } from "@m0ticketing/common";
import express, { Request, Response } from "express";
import Tickets from "../model/tickets";

const router = express.Router();

router.put("/:id", requireAuth, async (req: Request, res: Response) => {
  const ticket = await Tickets.findById(req.params.id);

  if (!ticket) {
    throw new NotFound();
  }

  res.sendStatus(200);
});

export { router as updateTicketRouter };
