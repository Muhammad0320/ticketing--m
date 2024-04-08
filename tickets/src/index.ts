import mongoose from "mongoose";

import { app } from "./app";
import { natsWrapper } from "../natsWrapper";
import { randomBytes } from "crypto";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await natsWrapper.connect(
      "ticketing--m",
      randomBytes(4).toString("hex"),
      "http://nats-srv:4222"
    );

    console.log(natsWrapper.client);

    natsWrapper.client.on("close", () => {
      console.log(" NATS connection closed! ");

      process.exit();
    });

    process.on("SIGTERM", () => natsWrapper.client.close());
    process.on("SIGINT", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
