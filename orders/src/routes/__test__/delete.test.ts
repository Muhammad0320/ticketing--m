import { app } from "../../app";
import Ticket from "../../model/tickets";
import request from "supertest";
import { natsWrapper } from "../../natsWrapper";

it("cancels an order", async () => {
  const ticket = await Ticket.buildTicket({ title: "shit", price: 90 });

  const user = global.signin();

  const {
    body: { data: orderData },
  } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${orderData.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);
});

it("publishes an order cancelled event", async () => {
  const ticket = await Ticket.buildTicket({ title: "shit", price: 90 });

  const user = global.signin();

  const {
    body: { data: orderData },
  } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${orderData.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
