import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { currentUserRouter } from "./routes/currentUser";
import { NotFound, errorHandler } from "@m0ticketing/common";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(
  cookieSession({
    httpOnly: true,
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

console.log("Hi mom");

const rootUserUrl = "/api/users";

app.use(rootUserUrl, signupRouter);
app.use(rootUserUrl, signinRouter);
app.use(rootUserUrl, signoutRouter);

app.use(rootUserUrl, currentUserRouter);

app.all("*", (req, res) => {
  throw new NotFound();
});

app.use(errorHandler);

export { app };

// dism /online /Enable-Feature /FeatureName:TelnetClient
// muhammawwal@005