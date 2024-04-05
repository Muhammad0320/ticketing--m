import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUser, errorHandler, NotFound } from "@m0ticketing/common";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { ticketIndexRouter } from "./routes";

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

const rootUrl = "/api/tickets";

app.use(rootUrl, createTicketRouter);
app.use(rootUrl, showTicketRouter);
app.use(rootUrl, ticketIndexRouter);

app.all("*", async (req, res) => {
  throw new NotFound();
});

app.use(errorHandler);

export { app };
