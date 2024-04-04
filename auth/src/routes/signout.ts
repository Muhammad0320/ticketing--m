import express, { Request, Response } from "express";

const router = express.Router();

router.post("/signout", (req: Request, res: Response) => {
  req.session = null;

  return res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
});

export { router as signoutRouter };
