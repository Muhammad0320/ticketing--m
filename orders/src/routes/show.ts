import express, { Request, Response } from "express";

const router = express.Router();

router.get("/:orderId", async (req: Request, res: Response) => {});

export { router as showOrderRouter };
