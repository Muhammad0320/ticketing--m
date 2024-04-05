import request from "supertest";
import { app } from "../../app";

const fetchTicket = () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "Tafseer", price: 10 })
    .expect(201);
};

it("fetches all tickets", async () => {
  await fetchTicket();
  await fetchTicket();
  await fetchTicket();
  await fetchTicket();

  const response = await request(app).get("/api/tickets").send().expect(200);
});
