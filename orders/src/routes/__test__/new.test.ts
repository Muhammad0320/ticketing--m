import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("returns a 404 if ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId })
    .expect(404);
});

it("returns a 400 if a ticket is already reserved", async () => {});

it("creates a ticket", async () => {});
