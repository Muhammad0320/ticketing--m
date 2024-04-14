import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if there is no order with such id", async () => {
  await request(app)
    .post("/api/payment")
    .set("Cookie", global.signin())
    .send({
      token: "fejvfjvf",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("returns a 401 if users tried to pay for a ticket that they don't own", async () => {});

it("returns a 400, if a calcelled order is orderes", async () => {});
