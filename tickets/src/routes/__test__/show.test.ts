import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("return a 404 when user finds to get a ticket that does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get("/api/tickets/" + ticketId)
    .send()
    .expect(404);
});

it("return a ticket on valid id", async () => {});
