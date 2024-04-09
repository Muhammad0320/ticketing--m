import express, { Request, Response } from "express";

const router = express.Router();

router.delete("/:orderId", async (req: Request, res: Response) => {});

export { router as deleteOrderRouter };
