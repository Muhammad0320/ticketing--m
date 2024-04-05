import express, { Request, Response } from "express";
import Tickets from "../model/tickets";
import { NotFound } from "@m0ticketing/common";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const ticket = await Tickets.findById(id);

  if (!ticket) {
    throw new NotFound();
  }
});
