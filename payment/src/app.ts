import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser, errorHandler, NotFound } from "@m0ticketing/common";
import { createCharegeRouter } from "./routes/new";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

const rootUrl = "/api/payment";

app.use(rootUrl, createCharegeRouter);

app.all("*", async (req, res) => {
  throw new NotFound();
});

app.use(errorHandler);

export { app };
