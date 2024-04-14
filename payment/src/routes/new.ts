import { requireAuth } from "@m0ticketing/common";
import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", requireAuth, (req: Request, res: Response) => {});
