import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put("/api/tickets/" + id)
    .send({ ticket: "tafseer", price: 50 });
});

it("returns a 400 if there is no ticket eith such id", async () => {});
it("returns a 400 if user if user provides invalid price or title", async () => {});
it("returns a 401 if user tries to update other peoples ticket", async () => {});
it("updates ticket with valid inputs", async () => {});
