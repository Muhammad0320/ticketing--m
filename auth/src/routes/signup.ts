import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { User, UserType } from "../model/User";
import express, { Request, Response } from "express";
import { BadRequestError, requestValidator } from "@m0ticketing/common";

const router = express.Router();

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage("password should contain at least 8 characters"),
  ],

  requestValidator,

  async (req: Request, res: Response) => {
    const { email, password }: UserType = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError(
        "This email is in use, Please try with a different email"
      );
    }

    const user = await User.buildUser({ email, password });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: token,
    };

    res.status(201).json({ status: "success", user });
  }
);

export { router as signupRouter };
