import express, { Request, Response } from "express";
import { currentUser } from "@m0ticketing/common";

const router = express.Router();

router.get("/currentUser", currentUser, (req: Request, res: Response) => {
  res.status(200).json({ status: "success", currentUser: req.currentUser });
});

export { router as currentUserRouter };
