import { app } from "../../app";
import Ticket from "../../model/tickets";
import request from "supertest";

const buildTicket = async () => {
  const ticket = await Ticket.buildTicket({ price: 99, title: "sport event" });

  return ticket;
};

it("fetckes all the tickets that belogs to a user", async () => {
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  const user1 = global.signin();

  const user2 = global.signin();

  const {
    body: { data: order1 },
  } = await request(app)
    .post("/api/orders")
    .set("Cookie", user1)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  const {
    body: { data: order2 },
  } = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({ ticketId: ticketTwo.id })
    .expect(201);

  const {
    body: { data: order3 },
  } = await request(app)
    .post("/api/orders")
    .set("Cookie", user2)
    .send({ ticket: ticketThree.id })
    .expect(201);
});
