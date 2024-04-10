import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the order does not exist", async () => {
  const orderId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/orders/${orderId}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(404);
});
