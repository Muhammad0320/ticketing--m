import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import jwt from "jsonwebtoken";

declare global {
  var signin: () => string[];
}

jest.mock("../natsWrapper.ts");

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "ticketing-clientper-long-and-ultra-secure-jwt-secret";

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  const email = "test@test.com";
  const id = new mongoose.Types.ObjectId().toHexString();

  const payload = { email, id };

  // create a jwt

  if (!process.env.JWT_KEY) throw new Error("");

  const token = jwt.sign(payload, process.env.JWT_KEY);

  // Build a session obj { jwt: MY_JWT }

  const sessionObj = { jwt: token };

  // Turn the session obj into json string

  const sessionJSon = JSON.stringify(sessionObj);

  // Encode the json as base 64

  const base64 = Buffer.from(sessionJSon).toString("base64");

  // returns a string and that's the cookie with encoded data

  return [`session=${base64}`];
};
