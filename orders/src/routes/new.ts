import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {});

export { router as newOrderRouter };
