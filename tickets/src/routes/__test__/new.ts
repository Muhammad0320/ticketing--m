import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  res.sendStatus(201);
});

export { router as createTicketRouter };
