import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  // my-super-long-and-ultra-secure-jwt-secret

  try {
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

/*
    34.134.113.44 ticketing.dev
34.68.142.10 ticketing--m.dev 
    */
