import express, { Request, Response } from "express";

import { requireAuth } from "@m0ticketing/common";

const router = express.Router();

router.post("/", requireAuth, async (req: Request, res: Response) => {
  res.sendStatus(201);
});

export { router as createTicketRouter };
