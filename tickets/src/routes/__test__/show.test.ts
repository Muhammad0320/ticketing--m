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

it("return a ticket on valid id", async () => {
  const price = 30;

  const title = "Tafseer";

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  console.log(response.body);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.data.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.data.price).toEqual(price);
  expect(ticketResponse.body.data.title).toEqual(title);
});
